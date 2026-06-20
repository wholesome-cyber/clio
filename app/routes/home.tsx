import type { Route } from "./+types/home";
import { useEffect, useState } from "react";

type IconName =
  | "accounts"
  | "activity"
  | "bell"
  | "billing"
  | "briefcase"
  | "calendarDay"
  | "calendar"
  | "chat"
  | "check"
  | "close"
  | "chevronDown"
  | "chevronLeft"
  | "chevronRight"
  | "clock"
  | "contacts"
  | "documents"
  | "external"
  | "home"
  | "info"
  | "list"
  | "play"
  | "plus"
  | "question"
  | "reports"
  | "search"
  | "settings"
  | "view";

type DashboardTab = "personal" | "firm" | "feed";

type FirmReport = {
  title: string;
  activeUnit: "Hr." | "₦" | "%";
  yAxis: string;
  totals: Array<{ label: string; accent: string }>;
  legend: Array<{ label: string; accent: string; dashed?: boolean }>;
  externalLink?: string;
};

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Clio Dashboard Clone" },
    {
      name: "description",
      content: "A Clio-inspired legal practice dashboard clone.",
    },
  ];
}

const navItems: Array<{ label: string; icon: IconName; active?: boolean }> = [
  { label: "Dashboard", icon: "home", active: true },
  { label: "Calendar", icon: "calendar" },
  { label: "Tasks", icon: "list" },
  { label: "Matters", icon: "briefcase" },
  { label: "Contacts", icon: "contacts" },
  { label: "Activities", icon: "clock" },
  { label: "Billing", icon: "billing" },
  { label: "Accounts", icon: "accounts" },
  { label: "Documents", icon: "documents" },
  { label: "Communications", icon: "chat" },
  { label: "Reports", icon: "reports" },
];

const billingMetrics = [
  {
    title: "Draft Bills",
    value: "0",
    detail: "Create new bills",
  },
  {
    title: "Total in Draft",
    value: "-",
    detail: "",
  },
  {
    title: "Unpaid Bills",
    value: "0",
    detail: "Approve from Draft or Pending Approval",
  },
  {
    title: "Total in Unpaid",
    value: "-",
    detail: "",
  },
  {
    title: "Overdue Bills",
    value: "0",
    detail: "",
    danger: true,
  },
  {
    title: "Total in Overdue",
    value: "-",
    detail: "",
    danger: true,
  },
];

const financialCards = [
  {
    title: "Today",
    labels: ["₦0.00", "₦100.00", "₦200.00", "₦300.00", "₦400.00"],
    expected: 235,
    target: 385,
  },
  {
    title: "This Week",
    labels: ["₦0.00", "₦500.00", "₦1,000.00", "₦1,500.00", "₦2,000.00"],
    expected: 1380,
    target: 1900,
  },
  {
    title: "This Month",
    labels: ["₦0.00", "₦5,000.00", "₦10,000.00"],
    expected: 5200,
    target: 8300,
  },
  {
    title: "This Year",
    labels: ["₦0.00", "₦50,000.00", "₦100,000.00"],
    expected: 45500,
    target: 99000,
  },
];

const months = [
  "01/2026",
  "02/2026",
  "03/2026",
  "04/2026",
  "05/2026",
  "06/2026",
  "07/2026",
  "08/2026",
  "09/2026",
  "10/2026",
  "11/2026",
  "12/2026",
];

const annualLabels = [
  "₦0.00",
  "₦10,000.00",
  "₦20,000.00",
  "₦30,000.00",
  "₦40,000.00",
  "₦50,000.00",
  "₦60,000.00",
  "₦70,000.00",
  "₦80,000.00",
  "₦90,000.00",
  "₦100,000.00",
];

const dashboardTabs: Array<{ id: DashboardTab; label: string }> = [
  { id: "personal", label: "Personal Dashboard" },
  { id: "firm", label: "Firm Dashboard" },
  { id: "feed", label: "Firm Feed" },
];

const firmReports: FirmReport[] = [
  {
    title: "Utilisation",
    activeUnit: "Hr.",
    yAxis: "Time (h)",
    totals: [
      { label: "BILLABLE", accent: "billable" },
      { label: "NON-BILLABLE", accent: "non-billable" },
      { label: "UNTRACKED", accent: "untracked" },
    ],
    legend: [
      { label: "BILLABLE", accent: "billable" },
      { label: "NON-BILLABLE", accent: "non-billable" },
      { label: "UNTRACKED", accent: "untracked" },
      { label: "2025 BILLABLE", accent: "billable", dashed: true },
      { label: "2025 NON-BILLABLE", accent: "non-billable", dashed: true },
      { label: "2025 UNTRACKED", accent: "untracked", dashed: true },
    ],
  },
  {
    title: "Realisation",
    activeUnit: "₦",
    yAxis: "Value (₦)",
    totals: [
      { label: "BILLED: NONDISCOUNTED", accent: "billed" },
      { label: "BILLED: DISCOUNTED", accent: "discounted" },
      { label: "UNBILLED & DRAFT", accent: "draft" },
    ],
    legend: [
      { label: "BILLED: NONDISCOUNTED", accent: "billed" },
      { label: "BILLED: DISCOUNTED", accent: "discounted" },
      { label: "UNBILLED & DRAFT", accent: "draft" },
      { label: "2025 BILLED: NONDISCOUNTED", accent: "billed", dashed: true },
      { label: "2025 BILLED: DISCOUNTED", accent: "discounted", dashed: true },
      { label: "2025 UNBILLED & DRAFT", accent: "draft", dashed: true },
    ],
  },
  {
    title: "Collection",
    activeUnit: "Hr.",
    yAxis: "Time (h)",
    externalLink: "See all current outstanding balances",
    totals: [
      { label: "COLLECTED", accent: "collected" },
      { label: "UNCOLLECTED", accent: "uncollected" },
    ],
    legend: [
      { label: "COLLECTED", accent: "collected" },
      { label: "UNCOLLECTED", accent: "uncollected" },
      { label: "2025 COLLECTED", accent: "collected", dashed: true },
      { label: "2025 UNCOLLECTED", accent: "uncollected", dashed: true },
    ],
  },
];

const firmChartYAxis = ["1", "0.9", "0.8", "0.7", "0.6", "0.5", "0.4", "0.3", "0.2", "0.1", "0"];

function formatElapsedTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
}

function formatDurationHours(totalSeconds: number) {
  return `${(totalSeconds / 3600).toFixed(4)}h`;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("personal");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timeEntrySeconds, setTimeEntrySeconds] = useState(0);
  const [isTimeEntryOpen, setIsTimeEntryOpen] = useState(false);

  useEffect(() => {
    if (!isTimerRunning) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isTimerRunning]);

  function selectTab(tab: DashboardTab) {
    setActiveTab(tab);
    requestAnimationFrame(() => {
      document.querySelector(".dashboard-scroll")?.scrollTo({ top: 0 });
    });
  }

  function toggleTimer() {
    if (isTimerRunning) {
      const capturedSeconds = elapsedSeconds;

      setIsTimerRunning(false);
      setTimeEntrySeconds(capturedSeconds);
      setElapsedSeconds(0);
      setIsTimeEntryOpen(true);
      return;
    }

    setElapsedSeconds(0);
    setIsTimerRunning(true);
  }

  return (
    <div className="clio-app">
      <TrialBanner />
      <TopBar
        elapsedSeconds={elapsedSeconds}
        isTimerRunning={isTimerRunning}
        onTimerClick={toggleTimer}
      />
      <div className="app-frame">
        <Sidebar />
        <main className="dashboard-scroll" aria-label="Dashboard">
          <DashboardTabs activeTab={activeTab} onSelect={selectTab} />
          {activeTab === "personal" && <PersonalDashboard />}
          {activeTab === "firm" && <FirmDashboard />}
          {activeTab === "feed" && <FirmFeed />}
        </main>
      </div>
      <button className="support-button" type="button" aria-label="Open support chat">
        <Icon name="chat" />
      </button>
      {isTimeEntryOpen && (
        <TimeEntryModal
          elapsedSeconds={timeEntrySeconds}
          onClose={() => setIsTimeEntryOpen(false)}
        />
      )}
    </div>
  );
}

function DashboardTabs({
  activeTab,
  onSelect,
}: {
  activeTab: DashboardTab;
  onSelect: (tab: DashboardTab) => void;
}) {
  return (
    <div className="dashboard-tabs" role="tablist" aria-label="Dashboard views">
      {dashboardTabs.map((tab) => (
        <button
          aria-selected={activeTab === tab.id}
          className={activeTab === tab.id ? "tab active" : "tab"}
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          role="tab"
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function PersonalDashboard() {
  return (
    <>
      <section className="dashboard-section agenda-section">
        <h1>
          Today&apos;s Agenda <a href="#hide">( Hide )</a>
        </h1>
        <div className="agenda-grid">
          <AgendaCard
            count="0"
            label="Tasks Due Today"
            message="You have no tasks due today"
          />
          <AgendaCard
            count="0"
            label="Calendar Events"
            message="You have no events scheduled for today"
          />
        </div>
      </section>

      <section className="metrics-row">
        <div>
          <SectionTitle title="Hourly Metrics for Abdullahi Danmusa" />
          <div className="metric-card hours-card">
            <h3>Billable Hours Target</h3>
            <nav className="period-tabs" aria-label="Billable hours range">
              <a className="active" href="#today">
                Today
              </a>
              <a href="#week">This Week</a>
              <a href="#month">This Month</a>
              <a href="#year">This Year</a>
            </nav>
            <div className="donut-wrap" aria-label="0 hours out of 1.9 hours">
              <div className="donut">
                <strong>0 Hours</strong>
                <span>1.9 Hours</span>
              </div>
            </div>
            <a className="settings-link" href="#settings">
              <Icon name="settings" />
              Personal performance settings
            </a>
          </div>
        </div>

        <div>
          <SectionTitle title="Billing Metrics for Firm" />
          <div className="billing-grid">
            {billingMetrics.map((metric) => (
              <BillingCard key={metric.title} {...metric} />
            ))}
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <SectionTitle title="Financial Metrics for Abdullahi Danmusa" />
        <div className="financial-grid">
          {financialCards.map((card) => (
            <FinancialCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="annual-card">
        <h2>Detailed Annual Report</h2>
        <div className="legend" aria-hidden="true">
          <span className="legend-item">
            <i className="target" /> Target
          </span>
          <span className="legend-item">
            <i className="actual" /> Actual
          </span>
        </div>
        <AnnualChart />
      </section>
    </>
  );
}

function FirmDashboard() {
  return (
    <section className="firm-dashboard" aria-label="Firm Dashboard">
      <div className="firm-overview">
        <div>
          <h1>Firm overview</h1>
          <p>Data last refreshed an hour ago (06/19/2026 3:00 PM PDT)</p>
        </div>
        <div className="firm-controls">
          <button className="select-button currency-select" type="button">
            NGN (₦)
            <Icon name="chevronDown" />
          </button>
          <button className="select-button users-select" type="button">
            All users
            <span>
              <Icon name="chevronDown" />
            </span>
          </button>
          <div className="year-control" aria-label="Year selector">
            <button type="button" aria-label="Previous year">
              <Icon name="chevronLeft" />
            </button>
            <button type="button">
              <strong>2026</strong>
              <Icon name="chevronDown" />
            </button>
            <button type="button" aria-label="Next year" className="muted">
              <Icon name="chevronRight" />
            </button>
          </div>
        </div>
      </div>

      <div className="firm-report-list">
        {firmReports.map((report) => (
          <FirmReportPanel key={report.title} report={report} />
        ))}
      </div>
    </section>
  );
}

function FirmFeed() {
  return (
    <section className="firm-feed" aria-label="Firm Feed">
      <div className="feed-alert" role="status">
        <Icon name="info" />
        <p>
          <strong>Firm Feed now shows the past 14 days by default.</strong> Use the{" "}
          <strong>Filter</strong> menu to adjust the date range.
        </p>
      </div>

      <div className="feed-toolbar">
        <button className="feed-filter" type="button">
          Filter
          <Icon name="chevronDown" />
        </button>
      </div>

      <div className="feed-table" role="table" aria-label="Firm activity feed">
        <div className="feed-table-head" role="row">
          <div role="columnheader">
            Description <span aria-hidden="true" />
          </div>
        </div>
        <div className="feed-empty-row" role="row">
          <div role="cell">No Results</div>
        </div>
      </div>
    </section>
  );
}

function TrialBanner() {
  return (
    <div className="trial-banner">
      <Icon name="info" />
      <span>
        Welcome to Clio! <a href="#setup">Set up your firm name</a> or{" "}
        <a href="#invite">Invite a new user</a>. You have 6 days remaining in your
        trial. <a href="#subscribe">Subscribe now.</a>
      </span>
    </div>
  );
}

function TopBar({
  elapsedSeconds,
  isTimerRunning,
  onTimerClick,
}: {
  elapsedSeconds: number;
  isTimerRunning: boolean;
  onTimerClick: () => void;
}) {
  return (
    <header className="top-bar">
      <button className="brand-mark" type="button" aria-label="Clio dashboard">
        <Icon name="check" />
      </button>
      <label className="search-box">
        <Icon name="search" />
        <span>Search Abdullahi Danmusa Legal</span>
        <kbd>Ctrl + K</kbd>
      </label>
      <div className={isTimerRunning ? "top-actions timer-running" : "top-actions"}>
        <button
          aria-label={isTimerRunning ? "Stop timer and edit entry" : "Start timer"}
          className="timer-button"
          onClick={onTimerClick}
          title={isTimerRunning ? "Stop timer" : "Start timer"}
          type="button"
        >
          <Icon name="play" />
          <strong>{formatElapsedTime(elapsedSeconds)}</strong>
        </button>
        <button className="icon-button history-button" type="button" title="Recent activity">
          <Icon name="clock" />
        </button>
        <button className="create-button" type="button">
          Create new
          <Icon name="plus" />
        </button>
        <button className="icon-button" type="button" title="Notifications">
          <Icon name="bell" />
        </button>
      </div>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="primary-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a className={item.active ? "active" : ""} href={`#${item.label}`} key={item.label}>
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="sidebar-footer">
        <a className="resource-link" href="#resources">
          <span className="resource-icon">
            <Icon name="question" />
            <em>9</em>
          </span>
          <strong>Resource centre</strong>
        </a>
        <a className="profile-link" href="#profile">
          <span className="avatar">AD</span>
          <span>
            <strong>Abdullahi Danmusa</strong>
            <small>Abdullahi Danmusa Legal</small>
          </span>
        </a>
        <button className="collapse-button" type="button">
          <span>
            <Icon name="chevronLeft" />
          </span>
          <strong>Collapse</strong>
        </button>
      </div>
    </aside>
  );
}

type TimeEntryAction = "save" | "createAnother" | "duplicate" | "cancel" | "delete";

type TimeEntry = {
  id: number;
  matter: string;
  activity: string;
  description: string;
  duration: string;
  date: string;
  entryTime: string;
  nonBillable: boolean;
  writtenOff: boolean;
  showOnBill: boolean;
};

function TimeEntryModal({
  elapsedSeconds,
  onClose,
}: {
  elapsedSeconds: number;
  onClose: () => void;
}) {
  const [duration, setDuration] = useState(formatDurationHours(elapsedSeconds));
  const [matterQuery, setMatterQuery] = useState("");
  const [activityQuery, setActivityQuery] = useState("");
  const [description, setDescription] = useState("");
  const [matterOpen, setMatterOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);
  const [nonBillable, setNonBillable] = useState(false);
  const [showOnBill, setShowOnBill] = useState(false);
  const [writtenOff, setWrittenOff] = useState(false);
  const [showMatterWarning, setShowMatterWarning] = useState(false);
  const [pendingAction, setPendingAction] = useState<TimeEntryAction | null>(null);
  const [confirmation, setConfirmation] = useState<{
    type: "cancel" | "delete";
    title: string;
    message: string;
    confirmLabel: string;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [historyEntries, setHistoryEntries] = useState<TimeEntry[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [replaySeconds, setReplaySeconds] = useState(elapsedSeconds);

  const showOnBillDisabled = !nonBillable || writtenOff;
  const nonBillableDisabled = writtenOff;
  const writtenOffDisabled = nonBillable;
  const matterSelected = matterQuery.trim().length > 0;

  useEffect(() => {
    if (!toastMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage("");
    }, 2600);

    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  function createHistoryEntry() {
    const entry: TimeEntry = {
      id: Date.now(),
      matter: matterQuery.trim() || "No matter",
      activity: activityQuery.trim() || "No activity",
      description: description.trim(),
      duration,
      date: "06/19/2026",
      entryTime: formatElapsedTime(replaySeconds),
      nonBillable,
      writtenOff,
      showOnBill,
    };

    setHistoryEntries((entries) => [entry, ...entries]);
    return entry;
  }

  function resetForm() {
    setDuration(formatDurationHours(0));
    setMatterQuery("");
    setActivityQuery("");
    setDescription("");
    setMatterOpen(false);
    setActivityOpen(false);
    setNonBillable(false);
    setShowOnBill(false);
    setWrittenOff(false);
    setReplaySeconds(0);
    setShowMatterWarning(false);
    setPendingAction(null);
  }

  function openConfirmation(type: "cancel" | "delete") {
    setConfirmation({
      type,
      title: type === "delete" ? "Delete entry" : "Discard entry",
      message:
        type === "delete"
          ? "You’re about to delete this entry. This action is permanent."
          : "Not all required fields have been filled. Do you want to discard the time entry or update the required fields?",
      confirmLabel: type === "delete" ? "Delete entry" : "Discard entry",
    });
  }

  function executeSaveAction(
    action: "save" | "createAnother" | "duplicate",
    closeOnSave = true,
  ) {
    createHistoryEntry();

    if (action === "save") {
      setToastMessage("Time entry saved");
      if (closeOnSave) {
        onClose();
      }
      return;
    }

    if (action === "createAnother") {
      setToastMessage("Time entry saved");
      resetForm();
      return;
    }

    setToastMessage("Time entry duplicated");
  }

  function handleAction(action: TimeEntryAction) {
    if (!matterSelected) {
      setPendingAction(action);
      setShowMatterWarning(true);
      return;
    }

    if (action === "cancel" || action === "delete") {
      openConfirmation(action);
      return;
    }

    executeSaveAction(action);
  }

  function changeNonBillable(checked: boolean) {
    setNonBillable(checked);
    setWrittenOff(false);
    if (!checked) {
      setShowOnBill(false);
    }
  }

  function changeWrittenOff(checked: boolean) {
    setWrittenOff(checked);
    if (checked) {
      setNonBillable(false);
      setShowOnBill(false);
    }
  }

  function continueWithoutMatter() {
    const nextAction = pendingAction === "createAnother" || pendingAction === "duplicate" ? pendingAction : "save";
    setShowMatterWarning(false);
    setPendingAction(null);
    executeSaveAction(nextAction, false);
    setIsHistoryOpen(true);
  }

  function closeConfirmation() {
    setConfirmation(null);
  }

  function confirmDialogAction() {
    if (!confirmation) {
      return;
    }

    if (confirmation.type === "delete") {
      setToastMessage("Time entry deleted");
    }

    onClose();
    setConfirmation(null);
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        aria-labelledby="time-entry-title"
        aria-modal="true"
        className="time-entry-modal"
        role="dialog"
      >
        <header className="modal-header">
          <h2 id="time-entry-title">Edit time entry</h2>
          <button aria-label="Close time entry modal" onClick={onClose} type="button">
            <Icon name="close" />
          </button>
        </header>

        <form className="time-entry-form" onSubmit={(event) => event.preventDefault()}>
          <div className="time-entry-body">
            <div className="modal-column">
              <div className="form-field">
                <label htmlFor="duration">
                  Duration <span className="blue-help">?</span>
                </label>
                <div className="duration-row">
                  <input
                    autoFocus
                    id="duration"
                    onChange={(event) => setDuration(event.target.value)}
                    value={duration}
                  />
                  <button className="duration-replay" type="button">
                    <Icon name="play" />
                    <span>{formatElapsedTime(replaySeconds)}</span>
                  </button>
                </div>
              </div>

              <SearchableEmptySelect
                id="activity-category"
                isOpen={activityOpen}
                label="Activity category"
                onOpenChange={setActivityOpen}
                onQueryChange={setActivityQuery}
                placeholder="Find a category"
                query={activityQuery}
              />

              <div className="form-field description-field">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </div>
            </div>

            <div className="modal-column">
              <SearchableEmptySelect
                id="matter"
                isOpen={matterOpen}
                label="Matter"
                onOpenChange={setMatterOpen}
                onQueryChange={setMatterQuery}
                placeholder="Find a matter by matter name or client"
                query={matterQuery}
              />

              <div className="form-field">
                <label htmlFor="entry-date">
                  Date <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <input id="entry-date" value="06/19/2026" readOnly />
                  <button aria-label="Open calendar" type="button">
                    <Icon name="calendarDay" />
                  </button>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="firm-user">
                  Firm user <span className="required">*</span>
                </label>
                <div className="select-like">
                  <input id="firm-user" value="Abdullahi Danmusa" readOnly />
                  <button aria-label="Choose firm user" type="button">
                    <Icon name="chevronDown" />
                  </button>
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="rate">
                  Rate <span className="required">*</span> <span className="blue-help">?</span>
                </label>
                <div className="rate-control">
                  <span>₦</span>
                  <input id="rate" value="0.00" readOnly />
                  <span>NGN / hr</span>
                  <em>Default rate</em>
                </div>
              </div>

              <div className="billing-options">
                <CheckboxField
                  checked={nonBillable}
                  disabled={nonBillableDisabled}
                  label="Non-billable"
                  onChange={changeNonBillable}
                  withHelp
                />
                <CheckboxField
                  checked={writtenOff}
                  disabled={writtenOffDisabled}
                  label="Written-off"
                  onChange={changeWrittenOff}
                />
                <CheckboxField
                  checked={showOnBill}
                  disabled={showOnBillDisabled}
                  label="Show this entry on the bill"
                  onChange={setShowOnBill}
                  wide
                />
              </div>
            </div>
          </div>

          {showMatterWarning && (
            <div className="matter-warning">
              <p>A matter was not selected. Would you like to continue?</p>
              <div className="matter-warning-actions">
                <button className="primary-action" type="button" onClick={continueWithoutMatter}>
                  Continue
                </button>
                <button
                  className="secondary-action compact"
                  type="button"
                  onClick={() => {
                    setShowMatterWarning(false);
                    setPendingAction(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <footer className="modal-footer">
            <button className="primary-action" onClick={() => handleAction("save")} type="button">
              Save entry
            </button>
            <button className="secondary-action" onClick={() => handleAction("createAnother")} type="button">
              Save and create another
            </button>
            <button className="secondary-action" onClick={() => handleAction("duplicate")} type="button">
              Save and duplicate
            </button>
            <button className="secondary-action compact" onClick={() => handleAction("cancel")} type="button">
              Cancel
            </button>
            <button className="delete-action" onClick={() => handleAction("delete")} type="button">
              Delete
            </button>
          </footer>
        </form>
      </section>

      {toastMessage && (
        <div className="toast-container" role="status" aria-live="polite">
          <div className="toast">{toastMessage}</div>
        </div>
      )}

      {confirmation && (
        <ConfirmDialog
          title={confirmation.title}
          message={confirmation.message}
          confirmLabel={confirmation.confirmLabel}
          onCancel={closeConfirmation}
          onConfirm={confirmDialogAction}
        />
      )}

      {isHistoryOpen && <EntryHistoryModal entries={historyEntries} onClose={() => setIsHistoryOpen(false)} />}
    </div>
  );
}

function SearchableEmptySelect({
  error,
  id,
  isOpen,
  label,
  onOpenChange,
  onQueryChange,
  placeholder,
  query,
}: {
  error: string;
  id: string;
  isOpen: boolean;
  label: string;
  onOpenChange: (open: boolean) => void;
  onQueryChange: (query: string) => void;
  placeholder: string;
  query: string;
}) {
  return (
    <div className="form-field empty-select-field">
      <label htmlFor={id}>{label}</label>
      <div className="select-like">
        <input
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          id={id}
          onChange={(event) => {
            onQueryChange(event.target.value);
            onOpenChange(true);
          }}
          onFocus={() => onOpenChange(true)}
          placeholder={placeholder}
          value={query}
        />
        <button
          aria-label={`Open ${label.toLowerCase()} list`}
          onClick={() => onOpenChange(!isOpen)}
          type="button"
        >
          <Icon name="chevronDown" />
        </button>
      </div>
      {isOpen && (
        <div className="empty-select-menu" role="listbox">
          <div role="option" aria-selected="false">
            No results found
          </div>
        </div>
      )}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

function ConfirmDialog({
  title,
  message,
  confirmLabel,
  onCancel,
  onConfirm,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
        <header className="confirm-header">
          <h3 id="confirm-dialog-title">{title}</h3>
          <button aria-label="Close confirmation dialog" onClick={onCancel} type="button">
            <Icon name="close" />
          </button>
        </header>
        <div className="confirm-body">
          <p>{message}</p>
        </div>
        <footer className="confirm-footer">
          <button className="delete-action" onClick={onConfirm} type="button">
            {confirmLabel}
          </button>
          <button className="secondary-action compact" onClick={onCancel} type="button">
            Cancel
          </button>
        </footer>
      </section>
    </div>
  );
}

function EntryHistoryModal({
  entries,
  onClose,
}: {
  entries: TimeEntry[];
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="history-modal" role="dialog" aria-modal="true" aria-labelledby="history-title">
        <header className="history-header">
          <h3 id="history-title">Time entry saved</h3>
          <button aria-label="Close history" onClick={onClose} type="button">
            <Icon name="close" />
          </button>
        </header>
        <div className="history-body">
          <p>Your entry has been saved. Here is the most recent time entry.</p>
          <ul>
            {entries.map((entry) => (
              <li key={entry.id} className="history-item">
                <div>
                  <strong>{entry.matter}</strong>
                  <p>{entry.description || "No description"}</p>
                </div>
                <div className="history-duration">{entry.entryTime}</div>
              </li>
            ))}
          </ul>
        </div>
        <footer className="history-footer">
          <button className="primary-action" type="button" onClick={onClose}>
            Close
          </button>
        </footer>
      </section>
    </div>
  );
}

function CheckboxField({
  checked,
  disabled,
  label,
  onChange,
  wide,
  withHelp,
}: {
  checked: boolean;
  disabled: boolean;
  label: string;
  onChange: (checked: boolean) => void;
  wide?: boolean;
  withHelp?: boolean;
}) {
  return (
    <label className={wide ? "checkbox-field wide" : "checkbox-field"}>
      <input
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <span>{label}</span>
      {withHelp && <span className="blue-help">?</span>}
    </label>
  );
}

function FirmReportPanel({ report }: { report: FirmReport }) {
  return (
    <article className="firm-report-card">
      <header className="report-header">
        <h2>
          <Icon name="chevronDown" />
          {report.title}
          <span className="help-dot" aria-label={`${report.title} information`} role="img">
            ?
          </span>
        </h2>
        <div className="activity-date">
          <span>Activities dated</span>
          <strong>Jan 1 - Jun 19, 2026</strong>
          <span className="help-dot" aria-label="Date range information" role="img">
            ?
          </span>
        </div>
      </header>

      <div className="report-content">
        <div className="rate-pane">
          <p className="field-label">
            Rate average <span className="small-help">?</span>
          </p>
          <div className="empty-rate">You have no data to display for this period</div>
          <div className="report-totals">
            <p className="field-label">
              Totals <span className="small-help">?</span>
            </p>
            <div className="total-grid">
              {report.totals.map((total) => (
                <div className={`total-item accent-${total.accent}`} key={total.label}>
                  <span>{total.label}</span>
                  <strong>-</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-pane">
          <div className="chart-pane-top">
            <span>Monthly</span>
            <div className="chart-actions">
              <SegmentedUnits activeUnit={report.activeUnit} />
              {report.externalLink && (
                <a href="#balances">
                  {report.externalLink}
                  <Icon name="external" />
                </a>
              )}
            </div>
          </div>
          <FirmEmptyChart yAxis={report.yAxis} />
          <ReportLegend items={report.legend} />
        </div>
      </div>
    </article>
  );
}

function SegmentedUnits({ activeUnit }: { activeUnit: FirmReport["activeUnit"] }) {
  const units: Array<FirmReport["activeUnit"]> = ["Hr.", "₦", "%"];

  return (
    <div className="unit-toggle" aria-label="Metric unit selector">
      {units.map((unit) => (
        <button
          className={unit === activeUnit ? "active" : ""}
          key={unit}
          type="button"
        >
          {unit}
        </button>
      ))}
    </div>
  );
}

function FirmEmptyChart({ yAxis }: { yAxis: string }) {
  return (
    <svg
      className="firm-empty-chart"
      role="img"
      aria-label={`Monthly ${yAxis} chart with no data for this period`}
      viewBox="0 0 760 318"
    >
      <line className="firm-axis" x1="93" y1="267" x2="725" y2="267" />
      <line className="firm-axis" x1="93" y1="42" x2="93" y2="267" />
      <text className="firm-axis-title" x="-168" y="29" transform="rotate(-90)">
        {yAxis}
      </text>
      {firmChartYAxis.map((label, index) => (
        <text className="firm-y-label" key={label} x="72" y={47 + index * 22}>
          {label}
        </text>
      ))}
      {months.map((month, index) => {
        const [number, year] = month.split("/");
        const monthName = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ][index];
        const x = 120 + index * 54;

        return (
          <g className="firm-month" key={month}>
            <text x={x} y="290">
              {monthName}
            </text>
            <text x={x} y="307">
              {year || number}
            </text>
          </g>
        );
      })}
      <text className="firm-empty-message" x="442" y="150">
        You have no data to display for this period
      </text>
    </svg>
  );
}

function ReportLegend({ items }: { items: FirmReport["legend"] }) {
  return (
    <div className="report-legend" aria-hidden="true">
      {items.map((item) => (
        <span key={item.label}>
          <i className={`${item.dashed ? "dashed " : ""}accent-${item.accent}`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

function AgendaCard({
  count,
  label,
  message,
}: {
  count: string;
  label: string;
  message: string;
}) {
  return (
    <div className="agenda-card">
      <div className="agenda-count">
        <strong>{count}</strong>
        <span>{label}</span>
        <button type="button" aria-label={`Add ${label.toLowerCase()}`}>
          <Icon name="plus" />
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="section-title">
      {title}
      <span aria-label="More information" role="img">
        ?
      </span>
    </h2>
  );
}

function BillingCard({
  title,
  value,
  detail,
  danger,
}: {
  title: string;
  value: string;
  detail: string;
  danger?: boolean;
}) {
  return (
    <article className="billing-card">
      <h3>{title}</h3>
      <p className={danger ? "danger" : ""}>
        <strong>{value}</strong>
        {detail && (
          <>
            {" "}
            <a href={`#${title}`}>{detail}</a>
          </>
        )}
      </p>
      <a className="view-link" href={`#view-${title}`}>
        <Icon name="view" />
        View
      </a>
    </article>
  );
}

function FinancialCard({
  title,
  labels,
  expected,
  target,
}: {
  title: string;
  labels: string[];
  expected: number;
  target: number;
}) {
  const max = Math.max(expected, target);
  const expectedHeight = Math.max(6, (expected / max) * 104);
  const targetHeight = Math.max(6, (target / max) * 104);

  return (
    <article className="financial-card">
      <h3>{title}</h3>
      <div className="mini-chart" aria-label={`${title} financial chart`}>
        <div className="axis-labels">
          {[...labels].reverse().map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="bars">
          <div className="bar-stack">
            <i className="bar empty" style={{ height: 6 }} />
            <span>Actual</span>
          </div>
          <div className="bar-stack">
            <i className="bar" style={{ height: expectedHeight }} />
            <span>Expected</span>
          </div>
          <div className="bar-stack">
            <i className="bar" style={{ height: targetHeight }} />
            <span>Target</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function AnnualChart() {
  const targetPoints = months
    .map((_, index) => `${70 + index * 86},${382 - index * 29.7}`)
    .join(" ");
  const actualPoints = months.map((_, index) => `${70 + index * 86},384`).join(" ");

  return (
    <svg
      className="annual-chart"
      role="img"
      aria-label="Detailed annual report with target increasing through 2026 and actual remaining at zero"
      viewBox="0 0 1100 440"
      preserveAspectRatio="none"
    >
      <g className="chart-labels y-labels">
        {annualLabels.map((label, index) => (
          <text key={label} x="6" y={384 - index * 32.6}>
            {label}
          </text>
        ))}
      </g>
      <line className="axis" x1="78" y1="386" x2="1032" y2="386" />
      <line className="axis" x1="78" y1="57" x2="78" y2="386" />
      <polyline className="target-line" points={targetPoints} />
      <polyline className="actual-line" points={actualPoints} />
      {months.map((month, index) => {
        const x = 70 + index * 86;
        const targetY = 382 - index * 29.7;

        return (
          <g key={month}>
            <circle className="target-dot" cx={x} cy={targetY} r="5" />
            <circle className="actual-dot" cx={x} cy="384" r="5" />
            <text className="month-label" x={x} y="408">
              {month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Icon({ name }: { name: IconName }) {
  const common = {
    "aria-hidden": true,
    focusable: false,
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "accounts":
      return (
        <svg {...common}>
          <path d="M4 10h16M6 10v8M10 10v8M14 10v8M18 10v8M3 20h18M12 4l8 4H4l8-4Z" />
        </svg>
      );
    case "activity":
      return (
        <svg {...common}>
          <path d="M12 8v5l3 2M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7ZM10 20h4" />
        </svg>
      );
    case "billing":
      return (
        <svg {...common}>
          <path d="M7 3h10v18l-2-1-2 1-2-1-2 1-2-1-2 1V3ZM8 8h8M8 12h8M8 16h5" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...common}>
          <path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1M4 8h16v11H4V8ZM4 12h16M10 12v2h4v-2" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <path d="M7 3v4M17 3v4M4 8h16M5 5h14v16H5V5Z" />
        </svg>
      );
    case "calendarDay":
      return (
        <svg {...common}>
          <path d="M7 3v4M17 3v4M4 8h16M5 5h14v16H5V5ZM8 12h8M8 16h5" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M7 8h10M7 12h7M21 11a8 8 0 0 1-8 8H8l-5 3 2-5a8 8 0 1 1 16-6Z" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m7 12 3 3 7-8M21 12a9 9 0 1 1-5.2-8.2" />
        </svg>
      );
    case "chevronDown":
      return (
        <svg {...common}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "chevronLeft":
      return (
        <svg {...common}>
          <path d="m15 18-6-6 6-6" />
        </svg>
      );
    case "chevronRight":
      return (
        <svg {...common}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <path d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
    case "contacts":
      return (
        <svg {...common}>
          <path d="M8 7h8M8 12h5M6 3h12v18H6V3ZM4 8h2M4 16h2M16 16a2 2 0 1 0-4 0" />
        </svg>
      );
    case "documents":
      return (
        <svg {...common}>
          <path d="M4 7h6l2 2h8v10H4V7ZM4 11h16" />
        </svg>
      );
    case "external":
      return (
        <svg {...common}>
          <path d="M14 4h6v6M20 4l-9 9M11 5H5v14h14v-6" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path d="M3 11 12 4l9 7M5 10v10h14V10M9 20v-6h6v6" />
        </svg>
      );
    case "info":
      return (
        <svg {...common}>
          <path d="M12 11v6M12 7h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
    case "list":
      return (
        <svg {...common}>
          <path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01" />
        </svg>
      );
    case "play":
      return (
        <svg {...common}>
          <path d="M8 5v14l11-7-11-7Z" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "question":
      return (
        <svg {...common}>
          <path d="M9.2 9a3 3 0 1 1 5.2 2c-.9.8-1.9 1.4-1.9 3M12 18h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      );
    case "reports":
      return (
        <svg {...common}>
          <path d="M5 19V9M12 19V5M19 19v-7M4 19h16" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <path d="m21 21-4.4-4.4M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4 12h2M18 12h2M12 4v2M12 18v2M6.3 6.3l1.4 1.4M16.3 16.3l1.4 1.4M17.7 6.3l-1.4 1.4M7.7 16.3l-1.4 1.4" />
        </svg>
      );
    case "view":
      return (
        <svg {...common}>
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        </svg>
      );
    default:
      return null;
  }
}
