// // /lib/api.ts

// import { User, List, Task, RegisterPayload, LoginPayload, CreateListPayload, CreateTaskPayload, UpdateTaskPayload, TaskQueryParams } from './types';

// const API_BASE = '/api'; // will map to your real backend later

// // Mock data — simulates DB. Replace with real fetch() when backend ready.
// const MOCK_USER: User = {
//   id: 'usr-001',
//   email: 'test@example.com',
//   displayName: 'Chandu',
// };

// const MOCK_LISTS: List[] = [
//   { id: 'lst-inbox', userId: MOCK_USER.id, name: 'Tasks', createdAt: '2025-11-10T08:00:00Z' },
//   { id: 'lst-grocery', userId: MOCK_USER.id, name: 'Groceries', createdAt: '2025-11-11T10:30:00Z' },
// ];

// const MOCK_TASKS: Task[] = [
//   {
//     id: 'tsk-001',
//     userId: MOCK_USER.id,
//     listId: 'lst-inbox',
//     title: 'Finish Next.js Todo App',
//     description: 'Implement frontend with mocked API',
//     isCompleted: false,
//     isImportant: true,
//     dueAt: '2025-11-20T18:00:00Z',
//     myDayDate: '2025-11-17',
//     priority: 1,
//     createdAt: '2025-11-15T09:00:00Z',
//     updatedAt: '2025-11-16T14:20:00Z',
//   },
//   {
//     id: 'tsk-002',
//     userId: MOCK_USER.id,
//     listId: 'lst-grocery',
//     title: 'Buy milk',
//     description: null,
//     isCompleted: true,
//     isImportant: false,
//     dueAt: null,
//     myDayDate: null,
//     priority: 0,
//     createdAt: '2025-11-12T11:15:00Z',
//     updatedAt: '2025-11-12T11:15:00Z',
//   },
//   {
//     id: 'tsk-003',
//     userId: MOCK_USER.id,
//     listId: null, // Inbox
//     title: 'Call mom',
//     description: 'Ask about dinner plans',
//     isCompleted: false,
//     isImportant: true,
//     dueAt: '2025-11-18T12:00:00Z',
//     myDayDate: '2025-11-17',
//     priority: 2,
//     createdAt: '2025-11-14T16:30:00Z',
//     updatedAt: '2025-11-17T08:10:00Z',
//   },
// ];

// // 🟡 NOTE: In real app, replace mock logic with `fetch(...)`
// // We'll keep this structure so you can just uncomment real fetch and remove mocks.

// export const api = {
//   auth: {
//     register: async (data: RegisterPayload): Promise<User> => {
//       console.log('[MOCK] Register:', data);
//       // Simulate network delay
//       await new Promise(r => setTimeout(r, 300));
//       return { ...MOCK_USER, displayName: data.displayName, email: data.email };
//     },

//     login: async (data: LoginPayload): Promise<User> => {
//       console.log('[MOCK] Login:', data);
//       await new Promise(r => setTimeout(r, 300));
//       if (data.email === 'test@example.com') return MOCK_USER;
//       throw new Error('Invalid credentials');
//     },

//     logout: async (): Promise<void> => {
//       console.log('[MOCK] Logout');
//       await new Promise(r => setTimeout(r, 200));
//     },

//     me: async (): Promise<User | null> => {
//       console.log('[MOCK] GET /me →', MOCK_USER);
//       await new Promise(r => setTimeout(r, 150));
//       return MOCK_USER; // In real app: return null if 401
//     },
//   },

//   lists: {
//     getAll: async (): Promise<List[]> => {
//       console.log('[MOCK] GET /lists →', MOCK_LISTS);
//       await new Promise(r => setTimeout(r, 200));
//       return MOCK_LISTS;
//     },

//     create: async (data: CreateListPayload): Promise<List> => {
//       console.log('[MOCK] POST /lists:', data);
//       const newList: List = {
//         id: `lst-${Date.now()}`,
//         userId: MOCK_USER.id,
//         name: data.name,
//         createdAt: new Date().toISOString(),
//       };
//       MOCK_LISTS.push(newList);
//       return newList;
//     },

//     update: async (id: string, data: { name: string }): Promise<List> => {
//       console.log(`[MOCK] PUT /lists/${id}:`, data);
//       const list = MOCK_LISTS.find(l => l.id === id);
//       if (!list) throw new Error('List not found');
//       list.name = data.name;
//       return list;
//     },

//     delete: async (id: string): Promise<void> => {
//       console.log(`[MOCK] DELETE /lists/${id}`);
//       const idx = MOCK_LISTS.findIndex(l => l.id === id);
//       if (idx !== -1) MOCK_LISTS.splice(idx, 1);
//     },
//   },

//   tasks: {
//     getAll: async (params: TaskQueryParams = {}): Promise<Task[]> => {
//       console.log('[MOCK] GET /tasks with params:', params);
//       await new Promise(r => setTimeout(r, 250));

//       let filtered = MOCK_TASKS;

//       if (params.listId !== undefined) {
//         filtered = filtered.filter(t => t.listId === params.listId);
//       }
//       if (params.completed !== undefined) {
//         filtered = filtered.filter(t => t.isCompleted === params.completed);
//       }
//       if (params.important !== undefined) {
//         filtered = filtered.filter(t => t.isImportant === params.important);
//       }
//       if (params.myDay) {
//         const today = new Date().toISOString().split('T')[0]; // "2025-11-17"
//         filtered = filtered.filter(t => t.myDayDate === today);
//       }
//       if (params.search) {
//         const term = params.search.toLowerCase();
//         filtered = filtered.filter(
//           t => t.title.toLowerCase().includes(term) || t.description?.toLowerCase().includes(term)
//         );
//       }

//       return filtered;
//     },

//     create: async (data: CreateTaskPayload): Promise<Task> => {
//       console.log('[MOCK] POST /tasks:', data);
//       const newTask: Task = {
//         id: `tsk-${Date.now()}`,
//         userId: MOCK_USER.id,
//         listId: data.listId ?? null,
//         title: data.title,
//         description: data.description ?? null,
//         isCompleted: false,
//         isImportant: false,
//         dueAt: data.dueAt ?? null,
//         myDayDate: null,
//         priority: data.priority ?? 0,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//       };
//       MOCK_TASKS.push(newTask);
//       return newTask;
//     },

//     get: async (id: string): Promise<Task> => {
//       const task = MOCK_TASKS.find(t => t.id === id);
//       if (!task) throw new Error('Task not found');
//       return task;
//     },

//     update: async (id: string, data: UpdateTaskPayload): Promise<Task> => {
//       console.log(`[MOCK] PUT /tasks/${id}:`, data);
//       const task = MOCK_TASKS.find(t => t.id === id);
//       if (!task) throw new Error('Task not found');
//       Object.assign(task, data, { updatedAt: new Date().toISOString() });
//       return task;
//     },

//     delete: async (id: string): Promise<void> => {
//       console.log(`[MOCK] DELETE /tasks/${id}`);
//       const idx = MOCK_TASKS.findIndex(t => t.id === id);
//       if (idx !== -1) MOCK_TASKS.splice(idx, 1);
//     },

//     toggleComplete: async (id: string): Promise<Task> => {
//       const task = MOCK_TASKS.find(t => t.id === id);
//       if (!task) throw new Error('Task not found');
//       task.isCompleted = !task.isCompleted;
//       task.updatedAt = new Date().toISOString();
//       return task;
//     },

//     toggleImportant: async (id: string): Promise<Task> => {
//       const task = MOCK_TASKS.find(t => t.id === id);
//       if (!task) throw new Error('Task not found');
//       task.isImportant = !task.isImportant;
//       task.updatedAt = new Date().toISOString();
//       return task;
//     },

//     addToMyDay: async (id: string, date: string): Promise<Task> => {
//       const task = MOCK_TASKS.find(t => t.id === id);
//       if (!task) throw new Error('Task not found');
//       task.myDayDate = date;
//       task.updatedAt = new Date().toISOString();
//       return task;
//     },

//     removeFromMyDay: async (id: string): Promise<Task> => {
//       const task = MOCK_TASKS.find(t => t.id === id);
//       if (!task) throw new Error('Task not found');
//       task.myDayDate = null;
//       task.updatedAt = new Date().toISOString();
//       return task;
//     },

//     moveToList: async (taskId: string, listId: string | null): Promise<Task> => {
//       const task = MOCK_TASKS.find(t => t.id === taskId);
//       if (!task) throw new Error('Task not found');
//       task.listId = listId;
//       task.updatedAt = new Date().toISOString();
//       return task;
//     },
//   },
// };










//  <-- Real Api -->
// /lib/api.ts

// /lib/api.ts

// import { 
//   User, List, Task, 
//   RegisterPayload, LoginPayload, 
//   CreateListPayload, CreateTaskPayload, 
//   UpdateTaskPayload, TaskQueryParams 
// } from './types';

// // 🔑 Base URL — use relative path (Next.js proxy) or absolute in production
// const API_BASE = '/api'; // ✅ Works with Next.js API routes or external backend

// // 🍪 Helper: Get auth token (assume JWT in httpOnly cookie — no token in JS!)
// // If you use localStorage, replace with `localStorage.getItem('token')`
// const getAuthHeaders = () => {
//   // For cookies: no custom headers needed — browser sends credentials automatically
//   // For Bearer tokens:
//   // const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
//   // return token ? { Authorization: `Bearer ${token}` } : {};
//   return {};
// };

// // ✅ Generic fetch wrapper with error handling
// const apiClient = async <T>(
//   input: RequestInfo,
//   init?: RequestInit
// ): Promise<T> => {
//   const res = await fetch(input, {
//     credentials: 'include', // 🔑 Essential for cookies (e.g., session/JWT in httpOnly cookie)
//     headers: {
//       'Content-Type': 'application/json',
//       ...getAuthHeaders(),
//       ...init?.headers,
//     },
//     ...init,
//   });

//   if (!res.ok) {
//     const errorData = await res.json().catch(() => ({}));
//     throw new Error(errorData.message || `HTTP ${res.status}: ${res.statusText}`);
//   }

//   return res.json();
// };

// // 🌐 Real API implementation
// export const api = {
//   auth: {
//     register: (data: RegisterPayload) => 
//       apiClient<User>(`${API_BASE}/auth/register`, {
//         method: 'POST',
//         body: JSON.stringify(data),
//       }),

//     login: (data: LoginPayload) => 
//       apiClient<User>(`${API_BASE}/auth/login`, {
//         method: 'POST',
//         body: JSON.stringify(data),
//       }),

//     logout: () => 
//       apiClient<void>(`${API_BASE}/auth/logout`, {
//         method: 'POST',
//       }),

//     me: () => 
//       apiClient<User>(`${API_BASE}/auth/me`),
//   },

//   lists: {
//     getAll: () => 
//       apiClient<List[]>(`${API_BASE}/lists`),

//     create: (data: CreateListPayload) => 
//       apiClient<List>(`${API_BASE}/lists`, {
//         method: 'POST',
//         body: JSON.stringify(data),
//       }),

//     update: (id: string, data: { name: string }) => 
//       apiClient<List>(`${API_BASE}/lists/${id}`, {
//         method: 'PUT',
//         body: JSON.stringify(data),
//       }),

//     delete: (id: string) => 
//       apiClient<void>(`${API_BASE}/lists/${id}`, {
//         method: 'DELETE',
//       }),
//   },

//   tasks: {
//     getAll: (params: TaskQueryParams = {}) => {
//       const searchParams = new URLSearchParams();
      
//       // Append supported query params
//       if (params.listId) searchParams.set('listId', params.listId);
//       if (params.completed !== undefined) searchParams.set('completed', String(params.completed));
//       if (params.important !== undefined) searchParams.set('important', String(params.important));
//       if (params.myDay) searchParams.set('myDay', 'true');
//       if (params.dueBefore) searchParams.set('dueBefore', params.dueBefore);
//       if (params.search) searchParams.set('search', params.search);
//       if (params.page) searchParams.set('page', String(params.page));
//       if (params.pageSize) searchParams.set('pageSize', String(params.pageSize));

//       const url = `${API_BASE}/tasks${searchParams.toString() ? `?${searchParams}` : ''}`;
//       return apiClient<Task[]>(url);
//     },

//     create: (data: CreateTaskPayload) => 
//       apiClient<Task>(`${API_BASE}/tasks`, {
//         method: 'POST',
//         body: JSON.stringify(data),
//       }),

//     get: (id: string) => 
//       apiClient<Task>(`${API_BASE}/tasks/${id}`),

//     update: (id: string, data: UpdateTaskPayload) => 
//       apiClient<Task>(`${API_BASE}/tasks/${id}`, {
//         method: 'PUT',
//         body: JSON.stringify(data),
//       }),

//     delete: (id: string) => 
//       apiClient<void>(`${API_BASE}/tasks/${id}`, {
//         method: 'DELETE',
//       }),

//     toggleComplete: (id: string) => 
//       apiClient<Task>(`${API_BASE}/tasks/${id}/toggle-complete`, {
//         method: 'POST',
//       }),

//     toggleImportant: (id: string) => 
//       apiClient<Task>(`${API_BASE}/tasks/${id}/toggle-important`, {
//         method: 'POST',
//       }),

//     addToMyDay: (id: string, date: string) => 
//       apiClient<Task>(`${API_BASE}/tasks/${id}/myday`, {
//         method: 'POST',
//         body: JSON.stringify({ date }),
//       }),

//     removeFromMyDay: (id: string) => 
//       apiClient<Task>(`${API_BASE}/tasks/${id}/myday`, {
//         method: 'DELETE',
//       }),

//     moveToList: (taskId: string, listId: string | null) => 
//       apiClient<Task>(`${API_BASE}/lists/${listId}/tasks/${taskId}`, {
//         method: 'POST',
//       }),
//   },
// };



// /lib/api.ts

import { 
  User, List, Task,
  RegisterPayload, LoginPayload,
  CreateListPayload, CreateTaskPayload,
  UpdateTaskPayload, TaskQueryParams 
} from './types';

// 🔌 Real backend base URL (adjust as needed)
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080/api';
// e.g., if backend runs on port 3001

// 🆔 Mock user (for auth only)
const MOCK_USER: User = {
  id: 'usr-001',
  email: 'test@example.com',
  displayName: 'Chandu',
};

// ✅ Mock auth — no real calls
export const api = {
  auth: {
    // ✅ All auth remains MOCKED
    register: async (data: RegisterPayload): Promise<User> => {
      console.log('[MOCK AUTH] Register:', data);
      await new Promise(r => setTimeout(r, 300));
      return { ...MOCK_USER, displayName: data.displayName, email: data.email };
    },

    login: async (data: LoginPayload): Promise<User> => {
      console.log('[MOCK AUTH] Login:', data);
      await new Promise(r => setTimeout(r, 300));
      if (data.email === 'test@example.com' && data.password) return MOCK_USER;
      throw new Error('Invalid credentials');
    },

    logout: async (): Promise<void> => {
      console.log('[MOCK AUTH] Logout');
      await new Promise(r => setTimeout(r, 200));
    },

    me: async (): Promise<User | null> => {
      console.log('[MOCK AUTH] GET /me →', MOCK_USER);
      await new Promise(r => setTimeout(r, 150));
      return MOCK_USER; // Always returns mock user
    },
  },

  // 🔌 REAL API CALLS BELOW — no mocks
  lists: {
    getAll: () => fetchLists(),
    create: (data: CreateListPayload) => createList(data),
    update: (id: string, data: { name: string }) => updateList(id, data),
    delete: (id: string) => deleteList(id),
  },

  tasks: {
    getAll: (params: TaskQueryParams = {}) => fetchTasks(params),
    create: (data: CreateTaskPayload) => createTask(data),
    get: (id: string) => getTask(id),
    update: (id: string, data: UpdateTaskPayload) => updateTask(id, data),
    delete: (id: string) => deleteTask(id),

    toggleComplete: (id: string) => toggleTaskComplete(id),
    toggleImportant: (id: string) => toggleTaskImportant(id),
    addToMyDay: (id: string, date: string) => addToMyDay(id, date),
    removeFromMyDay: (id: string) => removeFromMyDay(id),
    moveToList: (taskId: string, listId: string | null) => moveTaskToList(taskId, listId),
  },
};

// 🔌 Real API helpers — reusable, with error handling
const apiFetch = async <T>(
  url: string,
  config: RequestInit = {}
): Promise<T> => {
  const res = await fetch(`${API_BASE}${url}`, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
};

// 🔌 Lists API
const fetchLists = () => apiFetch<List[]>('/lists');
const createList = (data: CreateListPayload) => apiFetch<List>('/lists', { method: 'POST', body: JSON.stringify(data) });
const updateList = (id: string, data: { name: string }) => 
  apiFetch<List>(`/lists/${id}`, { method: 'PUT', body: JSON.stringify(data) });
const deleteList = (id: string) => 
  apiFetch<void>(`/lists/${id}`, { method: 'DELETE' });

// 🔌 Tasks API
const fetchTasks = (params: TaskQueryParams = {}) => {
  const search = new URLSearchParams();
  if (params.listId) search.set('listId', params.listId);
  if (params.completed !== undefined) search.set('completed', String(params.completed));
  if (params.important !== undefined) search.set('important', String(params.important));
  if (params.myDay) search.set('myDay', 'true');
  if (params.dueBefore) search.set('dueBefore', params.dueBefore);
  if (params.search) search.set('search', params.search);
  if (params.page) search.set('page', String(params.page));
  if (params.pageSize) search.set('pageSize', String(params.pageSize));

  const query = search.toString() ? `?${search}` : '';
  return apiFetch<Task[]>(`/tasks${query}`);
};

const createTask = (data: CreateTaskPayload) => 
  apiFetch<Task>('/tasks', { method: 'POST', body: JSON.stringify(data) });

const getTask = (id: string) => apiFetch<Task>(`/tasks/${id}`);

const updateTask = (id: string, data: UpdateTaskPayload) => 
  apiFetch<Task>(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) });

const deleteTask = (id: string) => 
  apiFetch<void>(`/tasks/${id}`, { method: 'DELETE' });

const toggleTaskComplete = (id: string) => 
  apiFetch<Task>(`/tasks/${id}/toggle-complete`, { method: 'POST' });

const toggleTaskImportant = (id: string) => 
  apiFetch<Task>(`/tasks/${id}/toggle-important`, { method: 'POST' });

const addToMyDay = (id: string, date: string) => 
  apiFetch<Task>(`/tasks/${id}/myday`, { 
    method: 'POST', 
    body: JSON.stringify({ date }) 
  });

const removeFromMyDay = (id: string) => 
  apiFetch<Task>(`/tasks/${id}/myday`, { method: 'DELETE' });

const moveTaskToList = (taskId: string, listId: string | null) => {
  const targetListId = listId || 'null'; // backend expects "null" or UUID
  return apiFetch<Task>(`/lists/${targetListId}/tasks/${taskId}`, { method: 'POST' });
};