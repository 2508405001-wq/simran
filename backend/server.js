const http = require('http');
const url = require('url');
const { db, saveDb } = require('./db');

const PORT = process.env.PORT || 5000;

// Helper to set CORS and JSON headers
function setHeaders(res, statusCode = 200) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
}

// Helper to parse JSON body
function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  console.log(`[${new Date().toISOString()}] ${method} ${pathname}`);

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    setHeaders(res, 204);
    return res.end();
  }

  // Root endpoint
  if (pathname === '/' && method === 'GET') {
    setHeaders(res);
    return res.end(JSON.stringify({
      name: 'FlowForge SaaS Native Node.js API Server',
      status: 'Running',
      endpoints: {
        health: '/api/health',
        auth: '/api/auth/me',
        analytics: '/api/analytics/summary',
        projects: '/api/projects',
        tasks: '/api/projects/tasks',
        roadmap: '/api/roadmap',
        team: '/api/team/members',
        liquid_precision: '/api/settings/liquid-precision'
      }
    }));
  }

  // API Health
  if (pathname === '/api/health' && method === 'GET') {
    setHeaders(res);
    return res.end(JSON.stringify({
      status: 'healthy',
      service: 'FlowForge SaaS REST API',
      timestamp: new Date().toISOString(),
      uptime_seconds: process.uptime(),
      version: '1.0.0'
    }));
  }

  // Auth / User Profile
  if (pathname === '/api/auth/me') {
    if (method === 'GET') {
      setHeaders(res);
      return res.end(JSON.stringify({ success: true, user: db.user }));
    }
    if (method === 'PUT') {
      const body = await getRequestBody(req);
      if (body.name) db.user.name = body.name;
      if (body.email) db.user.email = body.email;
      if (body.role) db.user.role = body.role;
      if (body.company) db.user.company = body.company;
      saveDb();
      setHeaders(res);
      return res.end(JSON.stringify({ success: true, message: 'Profile updated', user: db.user }));
    }
  }

  // Analytics
  if (pathname === '/api/analytics/summary' && method === 'GET') {
    setHeaders(res);
    return res.end(JSON.stringify({ success: true, data: db.analytics }));
  }
  if (pathname === '/api/analytics/trends' && method === 'GET') {
    setHeaders(res);
    return res.end(JSON.stringify({ success: true, trends: db.analytics.monthly_trends }));
  }

  // Projects & Tasks
  if (pathname === '/api/projects') {
    if (method === 'GET') {
      setHeaders(res);
      return res.end(JSON.stringify({ success: true, count: db.projects.length, projects: db.projects }));
    }
    if (method === 'POST') {
      const body = await getRequestBody(req);
      if (!body.title) {
        setHeaders(res, 400);
        return res.end(JSON.stringify({ success: false, error: 'Title is required' }));
      }
      const newProject = {
        id: `proj_${Date.now()}`,
        title: body.title,
        status: 'In Progress',
        progress: 0,
        team_count: body.team_count || 1,
        updated_at: new Date().toISOString().split('T')[0]
      };
      db.projects.push(newProject);
      saveDb();
      setHeaders(res, 201);
      return res.end(JSON.stringify({ success: true, project: newProject }));
    }
  }

  if (pathname === '/api/projects/tasks') {
    if (method === 'GET') {
      setHeaders(res);
      return res.end(JSON.stringify({ success: true, tasks: db.tasks }));
    }
    if (method === 'POST') {
      const body = await getRequestBody(req);
      if (!body.title) {
        setHeaders(res, 400);
        return res.end(JSON.stringify({ success: false, error: 'Task title is required' }));
      }
      const newTask = {
        id: `task_${Date.now()}`,
        project_id: body.project_id || 'proj_1',
        title: body.title,
        priority: body.priority || 'Medium',
        status: 'Todo',
        assignee: body.assignee || 'Unassigned'
      };
      db.tasks.push(newTask);
      saveDb();
      setHeaders(res, 201);
      return res.end(JSON.stringify({ success: true, task: newTask }));
    }
  }

  // Roadmap
  if (pathname === '/api/roadmap') {
    if (method === 'GET') {
      setHeaders(res);
      return res.end(JSON.stringify({ success: true, count: db.roadmap.length, features: db.roadmap }));
    }
    if (method === 'POST') {
      const body = await getRequestBody(req);
      if (!body.title) {
        setHeaders(res, 400);
        return res.end(JSON.stringify({ success: false, error: 'Feature title is required' }));
      }
      const newFeature = {
        id: `road_${Date.now()}`,
        title: body.title,
        category: body.category || 'Core Platform',
        quarter: body.quarter || 'Q4 2026',
        votes: 1,
        status: 'Planned'
      };
      db.roadmap.push(newFeature);
      saveDb();
      setHeaders(res, 201);
      return res.end(JSON.stringify({ success: true, feature: newFeature }));
    }
  }

  if (pathname.startsWith('/api/roadmap/') && pathname.endsWith('/upvote') && method === 'POST') {
    const id = pathname.split('/')[3];
    const feature = db.roadmap.find(f => f.id === id);
    if (!feature) {
      setHeaders(res, 404);
      return res.end(JSON.stringify({ success: false, error: 'Feature not found' }));
    }
    feature.votes += 1;
    saveDb();
    setHeaders(res);
    return res.end(JSON.stringify({ success: true, feature }));
  }

  // Team & Activity
  if (pathname === '/api/team/members' && method === 'GET') {
    setHeaders(res);
    return res.end(JSON.stringify({ success: true, members: db.team }));
  }

  if (pathname === '/api/team/activity') {
    if (method === 'GET') {
      setHeaders(res);
      return res.end(JSON.stringify({ success: true, activity: db.activity_feed }));
    }
    if (method === 'POST') {
      const body = await getRequestBody(req);
      if (!body.action) {
        setHeaders(res, 400);
        return res.end(JSON.stringify({ success: false, error: 'Action text is required' }));
      }
      const newAct = {
        id: `act_${Date.now()}`,
        user: body.user || db.user.name,
        action: body.action,
        timestamp: 'Just now'
      };
      db.activity_feed.unshift(newAct);
      saveDb();
      setHeaders(res, 201);
      return res.end(JSON.stringify({ success: true, activity: newAct }));
    }
  }

  // Settings / Liquid Precision
  if (pathname === '/api/settings/liquid-precision') {
    if (method === 'GET') {
      setHeaders(res);
      return res.end(JSON.stringify({ success: true, data: db.liquid_precision }));
    }
    if (method === 'PUT') {
      const body = await getRequestBody(req);
      if (body.flow_rate_lpm !== undefined) db.liquid_precision.flow_rate_lpm = parseFloat(body.flow_rate_lpm);
      if (body.viscosity_index !== undefined) db.liquid_precision.viscosity_index = parseFloat(body.viscosity_index);
      if (body.pressure_psi !== undefined) db.liquid_precision.pressure_psi = parseFloat(body.pressure_psi);
      if (body.temperature_c !== undefined) db.liquid_precision.temperature_c = parseFloat(body.temperature_c);
      if (body.auto_balance !== undefined) db.liquid_precision.auto_balance = Boolean(body.auto_balance);
      saveDb();
      setHeaders(res);
      return res.end(JSON.stringify({ success: true, data: db.liquid_precision }));
    }
  }

  // 404
  setHeaders(res, 404);
  res.end(JSON.stringify({ success: false, error: 'Endpoint Not Found' }));
});

server.listen(PORT, () => {
  console.log(`================================================`);
  console.log(` FlowForge Native Node.js API Server running on port ${PORT}`);
  console.log(` Health Check: http://localhost:${PORT}/api/health`);
  console.log(`================================================`);
});
