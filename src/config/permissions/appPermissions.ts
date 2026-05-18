/**
 * APP_PERMISSIONS
 * These are functional permissions used to control the UI based on User Roles.
 * Use these with your Auth logic to hide/show buttons and screens.
 */
export const APP_PERMISSIONS = {
  // Dashboard access
  VIEW_DASHBOARD: 'VIEW_DASHBOARD',

  // Employee Management (HR/Admin)
  VIEW_EMPLOYEE: 'VIEW_EMPLOYEE',
  CREATE_EMPLOYEE: 'CREATE_EMPLOYEE',
  EDIT_EMPLOYEE: 'EDIT_EMPLOYEE',
  DELETE_EMPLOYEE: 'DELETE_EMPLOYEE',

  // Attendance (Daily Operations)
  VIEW_ATTENDANCE: 'VIEW_ATTENDANCE',
  MARK_ATTENDANCE: 'MARK_ATTENDANCE',

  // Leave Management
  APPLY_LEAVE: 'APPLY_LEAVE',
  APPROVE_LEAVE: 'APPROVE_LEAVE',

  // Payroll/Finance
  VIEW_PAYROLL: 'VIEW_PAYROLL',
  PROCESS_PAYROLL: 'PROCESS_PAYROLL',

  // Inventory & Stock
  VIEW_INVENTORY: 'VIEW_INVENTORY',
  MANAGE_INVENTORY: 'MANAGE_INVENTORY',

  // Data Insights
  VIEW_REPORTS: 'VIEW_REPORTS',
} as const;

// This type ensures you can only use keys defined above
export type AppPermission = keyof typeof APP_PERMISSIONS;