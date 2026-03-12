import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  // 1. Create Founder
  const founder = await prisma.user.create({
    data: {
      email: 'founder@cxofriend.com',
      displayName: 'System Founder',
      role: 'admin',
      plan: 'enterprise',
      onboarded: true,
      preferences: { theme: 'dark' },
    },
  });

  // 2. Create 2 Demo Organizations
  const org1 = await prisma.organization.create({
    data: {
      name: 'Creative Agency Alpha',
      industry: 'Design',
      size: 10,
      plan: 'enterprise',
      settings: {},
      featureFlags: { enable_anti_gravity_ui: true },
      ownerId: founder.id,
    },
  });

  const org2 = await prisma.organization.create({
    data: {
      name: 'Architecture Firm Beta',
      industry: 'Architecture',
      size: 25,
      plan: 'enterprise',
      settings: {},
      featureFlags: { enable_anti_gravity_ui: true },
      ownerId: founder.id,
    },
  });

  // Update founder org
  await prisma.user.update({
    where: { id: founder.id },
    data: { organizationId: org1.id },
  });

  // 3. Create 3 Referral Codes via FeatureFlags or a custom entity
  // (We'll store them as feature flags / global settings for the seed)
  const codes = ['FOUNDERS-NEAR', 'FOUNDERS-CITIES', 'FOUNDERS-EVENTS'];
  for (const code of codes) {
    await prisma.featureFlag.upsert({
      where: { key: `referral_${code}` },
      create: {
        key: `referral_${code}`,
        enabled: true,
        global: true,
        conditions: { code },
      },
      update: {},
    });
  }

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
