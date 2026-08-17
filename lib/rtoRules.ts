export interface RtoRisk {
  level: 'LOW' | 'MEDIUM' | 'HIGH';
  isBlacklisted: boolean;
  message?: string;
}

export function getPincodeRtoRisk(pincode: string): RtoRisk {
  const cleanPin = (pincode || '').trim();
  if (!cleanPin || cleanPin.length !== 6) {
    return { level: 'LOW', isBlacklisted: false };
  }

  // Blacklisted pincodes with high historical return/RTO rates
  const highRiskPins = ['800001', '700001', '110001', '400001'];
  if (highRiskPins.includes(cleanPin)) {
    return {
      level: 'HIGH',
      isBlacklisted: true,
      message: 'Restricted pincode: Requires Full Prepaid checkout due to high logistics risk.'
    };
  }

  return { level: 'LOW', isBlacklisted: false };
}
