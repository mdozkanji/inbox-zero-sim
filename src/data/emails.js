const RAW_EMAILS = [
  {
    id: "e001",
    from: "hr@acmecorp.com",
    subject: "Q3 Performance Review Scheduled",
    preview: "Your performance review has been scheduled for next Thursday...",
    body: `Hi,

Your Q3 performance review has been scheduled for Thursday, October 19th at 2:00 PM in Conference Room B.

Please come prepared with a brief summary of your key accomplishments and any blockers you've encountered this quarter.

Your manager, Dana Reeves, will be leading the session. If you have any conflicts, please reach out at least 48 hours in advance.

Best,
Human Resources
Acme Corp`,
    isPhishing: false,
    difficulty: 1,
  },
  {
    id: "e002",
    from: "noreply@github.com",
    subject: "New sign-in to your GitHub account",
    preview: "A new sign-in was detected from San Francisco, CA...",
    body: `Hi there,

We noticed a new sign-in to your GitHub account from:

Location: San Francisco, CA, US
Device: Chrome on macOS
Time: Oct 17, 2024 at 09:41 AM PDT

If this was you, no action is needed.

If you don't recognize this activity, please secure your account immediately at github.com/settings/security.

GitHub Security Team`,
    isPhishing: false,
    difficulty: 1,
  },
  {
    id: "e003",
    from: "devops@acmecorp.com",
    subject: "Scheduled maintenance window - Saturday 02:00 UTC",
    preview: "Planned downtime for infrastructure upgrades this weekend...",
    body: `Team,

We have a scheduled maintenance window this Saturday from 02:00–04:00 UTC for infrastructure upgrades including database patching and load balancer configuration changes.

Expected impact: API services may be intermittently unavailable. Internal dashboards will be in read-only mode.

No action required from engineering. Monitoring will be active throughout.

If you have deployments planned for this window, please coordinate with the DevOps team by EOD Friday.

— DevOps
Acme Corp Infrastructure`,
    isPhishing: false,
    difficulty: 1,
  },
  {
    id: "e004",
    from: "security-alert@amaz0n-notifications.com",
    subject: "URGENT: Your account has been suspended",
    preview: "We have detected unusual activity. Verify your account immediately...",
    body: `Dear Valued Customer,

We have detected UNUSUAL ACTIVITY on your Amazon account. To protect you, we have temporarily suspended your account.

Your account will be PERMANENTLY CLOSED in 24 hours unless you verify your identity immediately.

Click the link below to restore access:

http://amaz0n-secure-verify.net/restore?token=xR7k2mP9

You must provide your full name, billing address, credit card details, and account password to complete verification.

Failure to act will result in permanent account termination.

Amazon Security Team`,
    isPhishing: true,
    difficulty: 1,
  },
  {
    id: "e005",
    from: "ceo@acmecorp-corp.com",
    subject: "Quick favor needed - confidential",
    preview: "Hey, I need you to handle something for me urgently...",
    body: `Hey,

I'm in back-to-back meetings all day and can't take calls. I need you to handle something urgent for me.

I need you to purchase $500 in Amazon gift cards for client appreciation. Get 5x $100 cards. Once you have them, scratch the back and email me the redemption codes directly.

I'll explain the full context when I'm out of meetings. This is time-sensitive — the client presentation is at 3 PM.

Don't discuss this with anyone else yet, I'll loop in finance afterward.

Thanks,
Marcus Webb
CEO, Acme Corp`,
    isPhishing: true,
    difficulty: 3,
  },
];

export default RAW_EMAILS;
