import api from "./axios";

export const createIssue = (formData) =>
    api.post("/issues", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

export const getAllIssues = () =>
    api.get("/issues");

export const getIssueById = (issueId) =>
    api.get(`/issues/${issueId}`);

export const assignIssue = (issueId, staffId) =>
    api.patch(`/issues/${issueId}/assign`, { staffId });

export const updateIssueStatus = (issueId, status) =>
    api.patch(`/issues/${issueId}/status`, { status });

export const deleteIssue = (issueId) =>
    api.delete(`/issues/${issueId}`);