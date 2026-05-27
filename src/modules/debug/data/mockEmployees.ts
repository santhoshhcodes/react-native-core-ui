// 1. Define the Data Contract Entity matching your schema architecture
export interface Employee {
    id: string;
    name: string;
    role: string;
    avatar: string;
}

// 2. Local In-Memory Static Storage Array
export const MOCK_EMPLOYEES: Employee[] = [
    { id: '1', name: 'John Doe', role: 'HR Manager', avatar: '👤' },
    { id: '2', name: 'Jane Smith', role: 'Lead Developer', avatar: '💻' },
    { id: '3', name: 'Santhosh Kannan', role: 'Mobile Engineer', avatar: '📱' },
    { id: '4', name: 'Lura Dev', role: 'Backend Architect', avatar: '⚡' },
];

/**
 * 3. Simulated Async Network Layer
 * Mimics real API infrastructure latency so you can verify loading states 
 * and animations without needing your FastAPI backend running.
 */
export const fetchMockEmployees = (): Promise<Employee[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_EMPLOYEES);
        }, 800); // 800ms artificial network delay simulation
    });
};