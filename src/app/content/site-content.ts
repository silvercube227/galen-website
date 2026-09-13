export interface PipelineStep {
  readonly index: string;
  readonly title: string;
  readonly detail: string;
}

export interface TrustPillar {
  readonly title: string;
  readonly body: string;
  readonly emphasis?: boolean;
}

/** ingest -> dossier -> decision tree -> cited draft -> sign-off */
export const pipelineSteps: readonly PipelineStep[] = [
  {
    index: '01',
    title: 'Ingest',
    detail:
      'QMS and DHF records, prior 510(k)s and Letters-to-File, risk files — plus live context from git, Jira and ECOs.',
  },
  {
    index: '02',
    title: 'Evidence dossier',
    detail: 'Only the records this one change turns on, each excerpt traced back to its source.',
  },
  {
    index: '03',
    title: 'Decision tree',
    detail:
      "FDA's change guidance as explicit, versioned logic. Every node cites what it branched on.",
  },
  {
    index: '04',
    title: 'Cited draft',
    detail:
      'A .docx Letter-to-File — or a flag that a 510(k) is likely required — every field linked to its evidence.',
  },
  {
    index: '05',
    title: 'Review and sign-off',
    detail: 'Field-by-field accept, edit or reject. A separate approver signs. Galen never submits.',
  },
];

export const trustPillars: readonly TrustPillar[] = [
  {
    title: 'Every field carries a citation',
    body: 'Each statement in the draft links to the excerpt it came from. Where the evidence does not support a claim, the field renders as a flagged placeholder — never as invented prose that reads plausible and cites nothing.',
  },
  {
    title: 'An auditable decision tree, not a prompt',
    body: "The regulatory logic is explicit and versioned, built from FDA's own guidance rather than retrieved and summarized at answer time. It is structured to be validated the way your QA team validates other quality-system software.",
    emphasis: true,
  },
  {
    title: 'An assistant, not a system of record',
    body: 'The approved Letter-to-File stays in your Veeva Vault, MasterControl or Polarion. Galen exports a .docx plus a machine-readable evidence sidecar for write-back, so your records stay where your auditors expect them.',
  },
  {
    title: 'A human decides, on the record',
    body: 'Field-by-field accept, edit or reject, with a separate approver sign-off. The audit trail captures who changed what and which evidence they saw when they decided.',
  },
];

export const audiencePoints: readonly string[] = [
  'Regulatory affairs and quality teams at medical device and medtech software companies.',
  'Active 510(k)-cleared product lines making frequent software or design changes.',
  'Single-product mid-market companies through to large multi-line device makers.',
];
