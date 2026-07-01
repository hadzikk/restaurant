export const ROLE = {
  OWNER: 1,
  STAFF: 2,
  CUSTOMER: 3,
} as const

export type RoleId = (typeof ROLE)[keyof typeof ROLE]

export const ROLE_LABELS: Record<RoleId, string> = {
  [ROLE.OWNER]: "owner",
  [ROLE.STAFF]: "staff",
  [ROLE.CUSTOMER]: "customer",
}

export const ROLE_NAME_TO_ID: Record<string, RoleId> = {
  owner: ROLE.OWNER,
  staff: ROLE.STAFF,
  customer: ROLE.CUSTOMER,
}

export const canAccessStaffArea = (roleId: number | undefined | null): boolean =>
  roleId === ROLE.OWNER || roleId === ROLE.STAFF

export const getRoleLabel = (roleId: number | undefined | null): string =>
  roleId && roleId in ROLE_LABELS
    ? ROLE_LABELS[roleId as RoleId]
    : ROLE_LABELS[ROLE.CUSTOMER]

export const getRoleIdFromName = (roleName: string | undefined | null): RoleId => {
  if (!roleName) return ROLE.CUSTOMER
  const normalized = roleName.toLowerCase()
  return ROLE_NAME_TO_ID[normalized] || ROLE.CUSTOMER
}
