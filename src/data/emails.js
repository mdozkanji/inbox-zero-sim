export const emails = [
  {
    id: "email_001",
    from: "HR Department <hr@company-portal.com>",
    subject: "Updated Remote Work Policy",
    preview: "Please review the updated policy document before Friday.",
    body: `
Hi Team,

We have updated our remote work policy for Q3.

Please review the attached document and confirm acknowledgment in the HR portal by Friday.

Best,
Clara
HR Department
    `,
    isPhishing: false,
    difficulty: 1
  },

  {
    id: "email_002",
    from: "IT Support <it-support@company.com>",
    subject: "Scheduled System Maintenance",
    preview: "There will be downtime tonight from 10 PM to 12 AM.",
    body: `
Hello,

Please note that system maintenance is scheduled tonight from 10 PM to 12 AM.

You may experience temporary login issues during this time.

Thank you,
IT Support
    `,
    isPhishing: false,
    difficulty: 1
  },

  {
    id: "email_003",
    from: "Payroll <payroll@company.com>",
    subject: "Payslip for September Available",
    preview: "Your latest payslip has been uploaded to the portal.",
    body: `
Hi,

Your September payslip is now available on the payroll portal.

Please log in through the official HR system to access it.

Regards,
Finance Team
    `,
    isPhishing: false,
    difficulty: 2
  },

  {
    id: "email_004",
    from: "Security Alert <security@company-secure.co>",
    subject: "Urgent: Account Verification Required",
    preview: "Your account will be suspended within 24 hours.",
    body: `
Dear User,

We detected unusual activity in your account.

You must verify your credentials within 24 hours or your access will be permanently suspended.

Click the link below immediately:
http://company-secure-verification.com

Security Team
    `,
    isPhishing: true,
    difficulty: 2
  },

  {
    id: "email_005",
    from: "CEO Office <ceo-office@companny.com>",
    subject: "Quick Favor Needed",
    preview: "I need you to purchase gift cards urgently.",
    body: `
Hi,

Are you available right now?

I’m in a meeting and need you to urgently purchase $500 in gift cards for a client. I will reimburse you.

Reply once done.

Thanks,
Michael
    `,
    isPhishing: true,
    difficulty: 3
  }
]