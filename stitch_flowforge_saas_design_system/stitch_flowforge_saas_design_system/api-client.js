/**
 * FlowForge API Client
 * Connects frontend HTML views to the Node.js REST API backend
 */

const API_BASE_URL = window.FLOWFORGE_API_URL || 'http://localhost:5000/api';

class FlowForgeClient {
  static async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`[FlowForge Client] Failed to fetch ${endpoint}:`, error.message);
      return null;
    }
  }

  // Health
  static getHealth() {
    return this.request('/health');
  }

  // Auth & Profile
  static getUserProfile() {
    return this.request('/auth/me');
  }

  static updateUserProfile(data) {
    return this.request('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // Analytics
  static getAnalyticsSummary() {
    return this.request('/analytics/summary');
  }

  static getAnalyticsTrends() {
    return this.request('/analytics/trends');
  }

  // Projects & Tasks
  static getProjects() {
    return this.request('/projects');
  }

  static createProject(title, team_count) {
    return this.request('/projects', {
      method: 'POST',
      body: JSON.stringify({ title, team_count })
    });
  }

  static getTasks() {
    return this.request('/projects/tasks');
  }

  static createTask(taskData) {
    return this.request('/projects/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData)
    });
  }

  // Roadmap
  static getRoadmap() {
    return this.request('/roadmap');
  }

  static upvoteFeature(id) {
    return this.request(`/roadmap/${id}/upvote`, { method: 'POST' });
  }

  // Team
  static getTeamMembers() {
    return this.request('/team/members');
  }

  static getActivityFeed() {
    return this.request('/team/activity');
  }

  static addActivity(action) {
    return this.request('/team/activity', {
      method: 'POST',
      body: JSON.stringify({ action })
    });
  }

  // Liquid Precision Settings
  static getLiquidPrecision() {
    return this.request('/settings/liquid-precision');
  }

  static updateLiquidPrecision(settings) {
    return this.request('/settings/liquid-precision', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
  }
}

window.FlowForgeClient = FlowForgeClient;
