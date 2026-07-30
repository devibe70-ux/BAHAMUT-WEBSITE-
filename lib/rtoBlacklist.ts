import { RtoBlacklistItem } from './types';

// Seed initial RTO Blacklist records for testing RTO Return Enforcement
export const INITIAL_RTO_BLACKLIST: RtoBlacklistItem[] = [
  {
    id: 'rto-seed-001',
    phone: '9898989898',
    email: 'fake.buyer@example.com',
    customer_name: 'Simulated Return Customer',
    reason: 'Refused delivery at doorstep (Door closed / Fake COD order)',
    returned_order_number: 'BM-2026-0999',
    added_at: '2026-07-20T10:00:00Z'
  }
];

export function getRtoBlacklist(): RtoBlacklistItem[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('bahamut_rto_blacklist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse RTO Blacklist', e);
      }
    }
  }
  return INITIAL_RTO_BLACKLIST;
}

export function addCustomerToRtoBlacklist(item: Omit<RtoBlacklistItem, 'id' | 'added_at'>): RtoBlacklistItem[] {
  const current = getRtoBlacklist();
  const cleanPhone = item.phone.replace(/\D/g, '').slice(-10);
  const cleanEmail = item.email.trim().toLowerCase();

  const exists = current.some(
    r =>
      (cleanPhone && r.phone.replace(/\D/g, '').slice(-10) === cleanPhone) ||
      (cleanEmail && r.email.toLowerCase() === cleanEmail)
  );

  let updated: RtoBlacklistItem[];
  if (!exists) {
    const newItem: RtoBlacklistItem = {
      ...item,
      id: `rto-${Date.now()}`,
      added_at: new Date().toISOString()
    };
    updated = [newItem, ...current];
  } else {
    updated = current;
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem('bahamut_rto_blacklist', JSON.stringify(updated));
  }
  return updated;
}

export function checkRtoRisk(phone: string, email: string): { isBlacklisted: boolean; reason?: string; orderNumber?: string } {
  const blacklist = getRtoBlacklist();
  const cleanPhone = phone.replace(/\D/g, '').slice(-10);
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanPhone && !cleanEmail) {
    return { isBlacklisted: false };
  }

  const match = blacklist.find(r => {
    const matchPhone = cleanPhone && r.phone.replace(/\D/g, '').slice(-10) === cleanPhone;
    const matchEmail = cleanEmail && r.email.toLowerCase() === cleanEmail;
    return matchPhone || matchEmail;
  });

  if (match) {
    return {
      isBlacklisted: true,
      reason: match.reason,
      orderNumber: match.returned_order_number
    };
  }

  return { isBlacklisted: false };
}
