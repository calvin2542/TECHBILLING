'use strict';

/* ══════════════════════════════════════════════════════
   PAGE DETECTION  — based on URL, not body class
   Both HTML files are now identical shells.
   ══════════════════════════════════════════════════════ */
const IS_DATA_PAGE = new URLSearchParams(window.location.search).has('page');

/* ══════════════════════════════════════════════════════
   PAGE-CONTENT REGISTRY  (used on data pages)
   ══════════════════════════════════════════════════════ */
const PAGE_CONTENT = {
  /* ── Admin ── */
  'registration':    { title: 'Registration',    icon: '', body: placeholder('Registration',    'Admin registration management.') },
  'manage-admins':   { title: 'Manage Admins',   icon: '', body: placeholder('Manage Admins',   'View and manage administrator accounts.') },
  'admins-reports':  { title: 'Admins Reports',  icon: '', body: placeholder('Admins Reports',  'Reports on admin activity and usage.') },
  /* ── Customers ── */
  'add-new-user': {
    title: 'Add New User',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/></svg>`,
    body: `
      <div class="page-form-section">
        <h3>Register New Customer</h3>
        <div class="form-row"><label class="form-label">Full Name</label><input class="form-input" placeholder="Enter full name"></div>
        <div class="form-row"><label class="form-label">Phone Number</label><input class="form-input" placeholder="+254..."></div>
        <div class="form-row"><label class="form-label">Username</label><input class="form-input" placeholder="username"></div>
        <div class="form-row"><label class="form-label">Password</label><input type="password" class="form-input" placeholder="password"></div>
        <div class="form-row"><label class="form-label">Package / Plan</label><input class="form-input" placeholder="Select plan"></div>
        <button class="form-btn">Create User</button>
      </div>`
  },
  'users': { title: 'Users', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>`, body: placeholder('All Users', 'Full list of registered users will load from backend.') },
  'users-location': { title: "User's Location", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`, body: placeholder("User's Location", 'Map view of user locations will display here.') },
  /* ── Activation ── */
  'activate-user': { title: 'Activate User', icon: '', body: `<div class="page-form-section"><h3>Activate User</h3><div class="form-row"><label class="form-label">Username / Phone</label><input class="form-input" placeholder="Search user..."></div><div class="form-row"><label class="form-label">Package</label><input class="form-input" placeholder="Select package"></div><button class="form-btn">Activate</button></div>` },
  'prepaid-users':   { title: 'Prepaid Users',    icon: '', body: placeholder('Prepaid Users',   'All prepaid accounts will be listed here.') },
  'active-users':    { title: 'Active Users',     icon: '', body: placeholder('Active Users',    'Currently active user accounts.') },
  'expired-users':   { title: 'Expired Users',    icon: '', body: placeholder('Expired Users',   'Accounts with expired subscriptions.') },
  'online-users':    { title: 'Online Users',     icon: '', body: placeholder('Online Users',    'Users currently connected to the network.') },
  'offline-users':   { title: 'Offline Users',    icon: '', body: placeholder('Offline Users',   'Users not currently connected.') },
  'roaming-users':   { title: 'Roaming Users',    icon: '', body: placeholder('Roaming Users',   'Users connected on roaming.') },
  'fup-users':       { title: 'FUP Users',        icon: '', body: placeholder('FUP Users',       'Users under Fair Usage Policy throttling.') },
  'compensate':      { title: 'Compensate',        icon: '', body: placeholder('Compensate',      'Compensate user data or time lost.') },
  'disable-hotspot': { title: 'Disable Hotspot Server', icon: '', body: placeholder('Disable Hotspot Server', 'Disable hotspot for selected router.') },
  /* ── Data Usage ── */
  'daily-usage':   { title: 'Daily Usage',   icon: '', body: placeholder('Daily Usage',   'Today\'s network usage breakdown.') },
  'weekly-usage':  { title: 'Weekly Usage',  icon: '', body: placeholder('Weekly Usage',  'This week\'s network usage stats.') },
  'monthly-usage': { title: 'Monthly Usage', icon: '', body: placeholder('Monthly Usage', 'Monthly bandwidth consumption report.') },
  /* ── Hotspot Vouchers ── */
  'all-vouchers':      { title: 'All Vouchers',      icon: '', body: placeholder('All Vouchers',      'Complete voucher inventory.') },
  'add-vouchers':      { title: 'Add Vouchers',       icon: '', body: placeholder('Add Vouchers',      'Generate new hotspot vouchers.') },
  'print-vouchers':    { title: 'Print Vouchers',     icon: '', body: placeholder('Print Vouchers',    'Print voucher sheets.') },
  'unused-vouchers':   { title: 'Unused Vouchers',    icon: '', body: placeholder('Unused Vouchers',   'Available unused vouchers.') },
  'used-vouchers':     { title: 'Used Vouchers',      icon: '', body: placeholder('Used Vouchers',     'Redeemed voucher history.') },
  'voucher-customers': { title: 'Voucher Customers',  icon: '', body: placeholder('Voucher Customers', 'Customers who use voucher codes.') },
  'voucher-agents':    { title: 'Voucher Agents',     icon: '', body: placeholder('Voucher Agents',    'Agent accounts handling voucher distribution.') },
  /* ── Hotspot Binding ── */
  'all-bindings':          { title: 'All Bindings',          icon: '', body: placeholder('All Bindings',          'All device/user bindings.') },
  'active-bindings':       { title: 'Active Bindings',        icon: '', body: placeholder('Active Bindings',        'Currently active bindings.') },
  'expired-bindings':      { title: 'Expired Bindings',       icon: '', body: placeholder('Expired Bindings',       'Expired device bindings.') },
  'bind-user-device':      { title: 'Bind a User/Device',     icon: '', body: placeholder('Bind a User/Device',     'Create a new MAC-to-user binding.') },
  'create-binding-speeds': { title: 'Create Binding Speeds',  icon: '', body: placeholder('Create Binding Speeds',  'Set speed profiles for bindings.') },
  'troubleshoot-tv':       { title: 'Troubleshoot TV Binding', icon: '', body: placeholder('Troubleshoot TV Binding','Diagnose TV binding issues.') },
  /* ── Packages/Plans ── */
  'hotspot-plans':     { title: 'Hotspot Plans',     icon: '', body: placeholder('Hotspot Plans',     'All hotspot pricing plans.') },
  'pppoe-plans':       { title: 'PPPOE Plans',       icon: '', body: placeholder('PPPOE Plans',       'PPPoE subscription plans.') },
  'static-ip-plans':   { title: 'Static IP Plans',   icon: '', body: placeholder('Static IP Plans',   'Fixed IP address plans.') },
  'bandwidth-plans':   { title: 'Bandwidth Plans',   icon: '', body: placeholder('Bandwidth Plans',   'Speed-based bandwidth packages.') },
  'advanced-bandwidth':{ title: 'Advanced Bandwidth', icon:'', body: placeholder('Advanced Bandwidth', 'Advanced bandwidth configuration.') },
  'qos':               { title: 'Quality of Service', icon: '', body: placeholder('Quality of Service','QoS rules and traffic shaping.') },
  'hotspot-trials':    { title: 'Hotspot Trials',    icon: '', body: placeholder('Hotspot Trials',    'Trial / free-access configurations.') },
  'fup':               { title: 'FUP',               icon: '', body: placeholder('Fair Usage Policy', 'FUP threshold and action settings.') },
  'schedule-plans':    { title: 'Schedule Plans',    icon: '', body: placeholder('Schedule Plans',    'Time-based plan scheduling.') },
  'tv-plans':          { title: 'TV Plans',           icon: '', body: placeholder('TV Plans',          'Television service plans.') },
  /* ── Transactions ── */
  'daily-transactions':  { title: 'Daily Transactions',  icon: '', body: placeholder('Daily Transactions',  'Today\'s payment transactions.') },
  'period-transactions': { title: 'Period Transactions', icon: '', body: placeholder('Period Transactions', 'Transactions over a selected period.') },
  'activation-history':  { title: 'Activation History',  icon: '', body: placeholder('Activation History',  'History of all activations.') },
  'comparisons-graphs':  { title: 'Comparisons/Graphs',  icon: '', body: placeholder('Comparisons/Graphs',  'Revenue comparison charts.') },
  'income-overview':     { title: 'Income Overview',     icon: '', body: placeholder('Income Overview',     'Total revenue summary.') },
  'stk-push-result':     { title: 'STK Push Result',     icon: '', body: placeholder('STK Push Result',     'M-Pesa STK push transaction results.') },
  /* ── Support Ticket ── */
  'support-ticket':    { title: 'Support Ticket', icon: '', body: placeholder('Support Ticket', 'Raise and track support tickets.') },
  /* ── Notifications ── */
  'single-user-sms':  { title: 'Single User Notification', icon: '', body: placeholder('Single User Notification', 'Send a notification to one user.') },
  'bulk-send':        { title: 'Bulk Send',       icon: '', body: placeholder('Bulk Send',       'Send bulk SMS/WhatsApp messages.') },
  'plan-specific':    { title: 'Plan Specific',   icon: '', body: placeholder('Plan Specific',   'Notify users on a specific plan.') },
  'router-specific':  { title: 'Router Specific', icon: '', body: placeholder('Router Specific', 'Notify users on a specific router.') },
  'schedule-sms':     { title: 'Schedule SMS',    icon: '', body: placeholder('Schedule SMS',    'Schedule future notifications.') },
  'sms-groups':       { title: 'SMS Groups',      icon: '', body: placeholder('SMS Groups',      'Manage notification groups.') },
  'sms-history':      { title: 'SMS History',     icon: '', body: placeholder('SMS History',     'Sent message history log.') },
  /* ── Network ── */
  'self-install':      { title: 'Self Install',      icon: '', body: placeholder('Self Install',      'Customer self-install portal.') },
  'replace-router':    { title: 'Replace Router',    icon: '', body: placeholder('Replace Router',    'Swap a router and migrate users.') },
  'routers':           { title: 'Routers',           icon: '', body: placeholder('Routers',           'All registered Mikrotik routers.') },
  'ip-pool':           { title: 'IP Pool',           icon: '', body: placeholder('IP Pool',           'IP address pool management.') },
  'router-backups':    { title: 'Router Backups',    icon: '', body: placeholder('Router Backups',    'Router configuration backups.') },
  'wireless-settings': { title: 'Wireless Settings', icon: '', body: placeholder('Wireless Settings', 'Wi-Fi SSID and security settings.') },
  'bridge':            { title: 'Bridge',            icon: '', body: placeholder('Bridge',            'Mikrotik bridge configuration.') },
  'ip-address':        { title: 'IP Address',        icon: '', body: placeholder('IP Address',        'IP address assignments.') },
  'files-network':     { title: 'Files',             icon: '', body: placeholder('Files',             'Router file management.') },
  'hotspot-network':   { title: 'Hotspot',           icon: '', body: placeholder('Hotspot Network',   'Hotspot server configuration.') },
  'ppp':               { title: 'PPP',               icon: '', body: placeholder('PPP',               'PPP interface and secret management.') },
  'queues':            { title: 'Queues',            icon: '', body: placeholder('Queues',            'Traffic queue and QoS management.') },
  'mikrotik-users':    { title: 'Mikrotik Users',    icon: '', body: placeholder('Mikrotik Users',    'Router admin user accounts.') },
  'cpu-load':          { title: 'CPU Load',          icon: '', body: placeholder('CPU Load',          'Router CPU and memory usage.') },
  'mikrotik-monitor':  { title: 'MikroTik Monitor',  icon: '', body: placeholder('MikroTik Monitor',  'Live router performance monitor.') },
  'interface-monitor': { title: 'Interface Monitor', icon: '', body: placeholder('Interface Monitor',  'Network interface traffic monitor.') },
  'network-discovery': { title: 'Network Discovery', icon: '', body: placeholder('Network Discovery',  'Discover devices on the network.') },
  /* ── Bulk Actions ── */
  'mass-delete-users': { title: 'Mass Delete Users',       icon: '', body: placeholder('Mass Delete Users',       'Permanently delete multiple users.') },
  'bulk-edit-expiry':  { title: 'Bulk Edit Expiry Period', icon: '', body: placeholder('Bulk Edit Expiry Period', 'Change expiry for multiple users.') },
  'bulk-edit-plans':   { title: 'Bulk Edit Plans',         icon: '', body: placeholder('Bulk Edit Plans',         'Change plans for multiple users.') },
  'bulk-edit-routers': { title: 'Bulk Edit Routers',       icon: '', body: placeholder('Bulk Edit Routers',       'Move users between routers.') },
  'transfer-router':   { title: 'Transfer Router',         icon: '', body: placeholder('Transfer Router',         'Transfer all users from one router.') },
  'delete-all-users':  { title: 'Delete ALL Users',        icon: '', body: placeholder('Delete ALL Users',        '⚠ Delete all users — irreversible action.') },
  /* ── Static Pages ── */
  'order-voucher':     { title: 'Order Voucher',       icon: '', body: placeholder('Order Voucher',       'Customer voucher ordering page.') },
  'voucher-template':  { title: 'Voucher Template',    icon: '', body: placeholder('Voucher Template',    'Design your voucher print template.') },
  'announcement':      { title: 'Announcement',        icon: '', body: placeholder('Announcement',        'Broadcast announcements to users.') },
  'registration-info': { title: 'Registration Info',   icon: '', body: placeholder('Registration Info',   'Customer registration page content.') },
  'privacy-policy':    { title: 'Privacy Policy',      icon: '', body: placeholder('Privacy Policy',      'Edit the privacy policy document.') },
  'terms-conditions':  { title: 'Terms and Conditions', icon: '', body: placeholder('Terms and Conditions','Edit terms & conditions.') },
  /* ── TR069 ACS ── */
  'setup-configs':      { title: 'Setup/Configs',      icon: '', body: placeholder('ACS Setup/Configs',   'TR-069 server configuration.') },
  'all-devices':        { title: 'All Devices',        icon: '', body: placeholder('All Devices',         'All TR-069 managed devices.') },
  'online-devices':     { title: 'Online Devices',     icon: '', body: placeholder('Online Devices',      'Currently reachable TR-069 devices.') },
  'offline-devices':    { title: 'Offline Devices',    icon: '', body: placeholder('Offline Devices',     'Offline TR-069 devices.') },
  'assigned-devices':   { title: 'Assigned Devices',   icon: '', body: placeholder('Assigned Devices',   'Devices assigned to subscribers.') },
  'unassigned-devices': { title: 'Unassigned Devices', icon: '', body: placeholder('Unassigned Devices', 'Unassigned TR-069 devices.') },
  /* ── Access Points ── */
  'list-aps':        { title: 'List APs',        icon: '', body: placeholder('Access Points List', 'All registered access points.') },
  'router-chaining': { title: 'Router Chaining', icon: '', body: placeholder('Router Chaining',   'Configure AP chaining topology.') },
  'add-new-ap':      { title: 'Add New AP',      icon: '', body: placeholder('Add New AP',        'Register a new access point.') },
  /* ── PPPoE Routers ── */
  'pppoe-setup':   { title: 'PPPoE Setup',   icon: '', body: placeholder('PPPoE Setup',   'Configure PPPoE server settings.') },
  'pppoe-devices': { title: 'PPPoE Devices', icon: '', body: placeholder('PPPoE Devices', 'PPPoE enabled router list.') },
  /* ── Hotspot APs ── */
  'hotspot-ap-setup': { title: 'Hotspot AP Setup', icon: '', body: placeholder('Hotspot AP Setup', 'Configure hotspot access points.') },
  'add-ap':           { title: 'Add AP',           icon: '', body: placeholder('Add AP',           'Add hotspot access point.') },
  'access-aps':       { title: 'Access APs',       icon: '', body: placeholder('Access APs',       'View and manage hotspot APs.') },
  /* ── Settings ── */
  'general-settings':    { title: 'General Settings',             icon: '', body: placeholder('General Settings',             'Core system settings.') },
  'localisation':        { title: 'Localisation',                 icon: '', body: placeholder('Localisation',                 'Language, timezone, and region settings.') },
  'dashboard-theme':     { title: 'Dashboard Theme',              icon: '', body: placeholder('Dashboard Theme',              'Customize dashboard colors and layout.') },
  'auto-notifications':  { title: 'Auto Notifications / Reminders',icon:'', body: placeholder('Auto Notifications',            'Set up automatic reminder messages.') },
  'import-pppoe':        { title: 'Import PPPOE',                 icon: '', body: placeholder('Import PPPOE',                 'Bulk import PPPoE users.') },
  'administrator-users': { title: 'Administrator Users',          icon: '', body: placeholder('Administrator Users',          'Manage admin accounts.') },
  'payment-gateway':     { title: 'Payment Gateway',              icon: '', body: placeholder('Payment Gateway',              'Configure payment integrations.') },
  'withdrawal-requests': { title: 'Withdrawal',                   icon: '', body: placeholder('Withdrawal',                   'Pending withdrawal request queue.') },
  'withdrawal-history':  { title: 'Withdrawal History',           icon: '', body: placeholder('Withdrawal History',           'Completed withdrawal records.') },
  'active-sessions':     { title: 'Active Sessions',              icon: '', body: placeholder('Active Sessions',              'Currently active admin sessions.') },
  'audit-cleanup':       { title: 'Audit & Cleanup',              icon: '', body: placeholder('Audit & Cleanup',              'System audit and cleanup tools.') },
  'clear-cache':         { title: 'Clear Cache',                  icon: '', body: placeholder('Clear Cache',                  'Purge system cache data.') },
  /* ── PPPoE Settings ── */
  'pppoe-settings-setup':  { title: 'PPPoE Settings Setup',  icon: '', body: placeholder('PPPoE Settings Setup',  'Server and pool configuration.') },
  'pppoe-troubleshooting': { title: 'PPPoE Troubleshooting', icon: '', body: placeholder('PPPoE Troubleshooting', 'Diagnose PPPoE connectivity issues.') },
  /* ── Standalone ── */
  'hotspot-settings': { title: 'Hotspot Settings', icon: '', body: placeholder('Hotspot Settings', 'Hotspot server configuration.') },
  'page-builder':     { title: 'Page Builder',     icon: '', body: placeholder('Page Builder',     'Drag-and-drop page builder for captive portal.') },
  /* ── Loyalty Points ── */
  'loyalty-setup':    { title: 'Loyalty Setup',    icon: '', body: placeholder('Loyalty Points Setup',   'Configure point earn/redeem rules.') },
  'loyalty-activity': { title: 'Loyalty Activity', icon: '', body: placeholder('Loyalty Activity Report','Point earn/spend history.') },
  'loyalty-redeemed': { title: 'Redeemed Points',  icon: '', body: placeholder('Redeemed Points',        'All redeemed loyalty reward history.') },
  /* ── Extras → SMS and WhatsApp ── */
  'sms-whatsapp-setup': { title: 'SMS & WhatsApp Setup', icon: '', body: placeholder('SMS & WhatsApp Setup', 'Configure API keys and sender IDs.') },
  'sms-send':           { title: 'Send SMS',             icon: '', body: placeholder('Send SMS',             'Send an SMS message to users.') },
  'whatsapp-send':      { title: 'Send WhatsApp',        icon: '', body: placeholder('Send WhatsApp',        'Send a WhatsApp message to users.') },
  /* ── Extras ── */
  'install-app':    { title: 'Install App',    icon: '', body: placeholder('Install App',    'Install or update system modules.') },
  'tutorials':      { title: 'Tutorials',      icon: '', body: placeholder('Tutorials',      'Video and written setup guides.') },
  'human-resource': { title: 'Human Resource', icon: '', body: placeholder('Human Resource', 'Staff management and payroll.') },
  'tax':            { title: 'Tax',            icon: '', body: placeholder('Tax Management', 'Tax rates and reporting.') },
  /* ── Inventory & Expenses ── */
  'inventory-dashboard': { title: 'Inventory Dashboard',   icon: '', body: placeholder('Inventory Dashboard',   'Stock and expense overview.') },
  'pos-terminal':        { title: 'POS Terminal',          icon: '', body: placeholder('POS Terminal',          'Point-of-sale sales interface.') },
  'sales-history':       { title: 'Sales History',         icon: '', body: placeholder('Sales History',         'Sales transaction history.') },
  'daily-sales':         { title: 'Daily Sales (Z-Report)', icon:'', body: placeholder('Daily Sales (Z-Report)', 'End-of-day sales summary.') },
  'cash-drawer':         { title: 'Cash Drawer',           icon: '', body: placeholder('Cash Drawer',           'Cash drawer management.') },
  'quotes':              { title: 'Quotes',                icon: '', body: placeholder('Quotes',                'Customer quotation management.') },
  'items':               { title: 'Items',                 icon: '', body: placeholder('Items',                 'Inventory item catalog.') },
  'categories':          { title: 'Categories',           icon: '', body: placeholder('Categories',            'Item category management.') },
  'stock-in-out':        { title: 'Stock In/Out',         icon: '', body: placeholder('Stock In/Out',         'Record stock movements.') },
  'stock-history':       { title: 'Stock History',        icon: '', body: placeholder('Stock History',        'Full stock movement history.') },
  'low-stock-alerts':    { title: 'Low Stock Alerts',     icon: '', body: placeholder('Low Stock Alerts',     'Items below minimum stock level.') },
  'suppliers':           { title: 'Suppliers',            icon: '', body: placeholder('Suppliers',            'Supplier contact management.') },
  'purchase-orders':     { title: 'Purchase Orders',      icon: '', body: placeholder('Purchase Orders',      'Manage purchase orders.') },
  'expenses':            { title: 'Expenses',             icon: '', body: placeholder('Expenses',             'Business expense tracking.') },
  'expense-categories':  { title: 'Expense Categories',  icon: '', body: placeholder('Expense Categories',  'Expense category management.') },
  'recurring-expenses':  { title: 'Recurring Expenses',  icon: '', body: placeholder('Recurring Expenses',  'Scheduled recurring expenses.') },
  'budgets':             { title: 'Budgets',              icon: '', body: placeholder('Budgets',              'Budget planning and tracking.') },
  'assets':              { title: 'Assets',               icon: '', body: placeholder('Assets',               'Fixed asset register.') },
  'stock-transfer':      { title: 'Stock Transfer',       icon: '', body: placeholder('Stock Transfer',       'Transfer stock between branches.') },
  'stock-adjustment':    { title: 'Stock Adjustment',     icon: '', body: placeholder('Stock Adjustment',     'Adjust stock counts manually.') },
  'inventory-reports':   { title: 'Inventory Reports',   icon: '', body: placeholder('Inventory Reports',    'Stock and expense summary reports.') },
  /* ── UISP ── */
  'uisp-signup':   { title: 'UISP Signup',      icon: '', body: placeholder('UISP Signup',      'Connect to Ubiquiti UISP platform.') },
  /* ── Logs ── */
  'freelspradius': { title: 'FreeRADIUS Logs',  icon: '', body: placeholder('FreeRADIUS Logs', 'Live FreeRADIUS server logs.') },
  'mikrotik-logs': { title: 'Mikrotik Logs',    icon: '', body: placeholder('Mikrotik Logs',   'Router syslog messages.') },
  /* ── Misc standalone ── */
  'escalate':    { title: 'Escalate',           icon: '', body: placeholder('Escalate Issue',      'Raise a support ticket to the development team.') },
  'social-spot': { title: 'Social Spot/Support', icon: '', body: placeholder('Social Spot/Support', 'Community support and social features.') },
  /* ── Fix Hotspot ── */
  'troubleshooting':          { title: 'Troubleshooting',           icon: '', body: placeholder('Troubleshooting',           'Step-by-step hotspot troubleshooting guide.') },
  'connected-no-internet':    { title: 'Connected Without Internet', icon: '', body: placeholder('Connected Without Internet','Diagnose "connected but no internet" issues.') },
  'trojans-tunneling':        { title: 'Trojans / Tunneling',       icon: '', body: placeholder('Trojans / Tunneling',       'Detect and block VPN/tunnel abuse.') },
  'sync-users':               { title: 'Sync Users',                icon: '', body: placeholder('Sync Users',                'Sync user sessions with Mikrotik.') },
  'dns-not-resolving':        { title: 'DNS Not Resolving',         icon: '', body: placeholder('DNS Not Resolving',         'Fix DNS resolution failures.') },
  'primary-proxy-unreachable':{ title: 'Primary & Proxy Unreachable',icon:'', body: placeholder('Primary & Proxy Unreachable','Fix server reachability issues.') },
  'cache-full':               { title: 'Cache Full',                icon: '', body: placeholder('Cache Full',                'Clear router cache.') },
  'dhcp-lease-failure':       { title: 'DHCP Lease Failure',        icon: '', body: placeholder('DHCP Lease Failure',        'Resolve IP assignment failures.') },
  'obtaining-ip':             { title: 'Obtaining IP',              icon: '', body: placeholder('Obtaining IP',              'Debug IP acquisition issues.') },
  'couldnt-get-ip':           { title: "Couldn't Get IP",           icon: '', body: placeholder("Couldn't Get IP",           'Resolve IP allocation failures.') },
  'hotspot-pool-empty':       { title: 'Hotspot Pool Empty',        icon: '', body: placeholder('Hotspot Pool Empty',        'Expand or reconfigure IP pool.') },
  /* ── Fix PPPoE ── */
  'no-response-server':  { title: 'No Response From Server',       icon: '', body: placeholder('No Response From Server',      'Fix PPPoE server unresponsive issues.') },
  'invalid-credentials': { title: 'Invalid Username or Password',  icon: '', body: placeholder('Invalid Username or Password', 'Reset or correct PPPoE credentials.') },
  'checking-username':   { title: 'Stuck on Checking Username',    icon: '', body: placeholder('Stuck on Checking Username',   'Diagnose PPPoE auth loop.') },
  'dialup-no-internet':  { title: 'Dial-up Connected, No Internet', icon:'', body: placeholder('Dial-up Connected, No Internet','Fix PPPoE connectivity issues.') },
  /* ── Recycle Bin ── */
  'deleted-items': { title: 'Deleted Items', icon: '', body: placeholder('Recycle Bin', 'View and restore recently deleted records.') },
};

function placeholder(title, desc) {
  return `<div class="page-placeholder">
    <svg class="page-placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/>
      <rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>
    </svg>
    <div class="page-placeholder-text">
      <strong style="color:#ccd6f6;display:block;margin-bottom:6px;">${title}</strong>
      ${desc}<br><br>
      <span style="font-size:.75rem;color:#4b5563">Content loads dynamically from the backend.</span>
    </div>
  </div>`;
}

/* ══════════════════════════════════════════════════════
   SIDEBAR BUILDER  — single source of truth for all pages
   ══════════════════════════════════════════════════════ */
function buildSidebarNav() {
  const nav = document.getElementById('sidebarMenu');
  if (!nav) return;

  // leaf item with star
  const S = (pid, label) =>
    `<div class="submenu-item nav-item" data-page-id="${pid}"><span class="menu-text">${label}</span><svg class="star-icon" data-page-id="${pid}" data-label="${label}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>`;
  // nested parent (no star)
  const P = (label) =>
    `<div class="submenu-item has-nested"><span class="menu-text">${label}</span><span class="menu-arrow">&lt;</span></div>`;
  // SVG icon wrapper
  const I = (d) =>
    `<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${d}</svg>`;
  // top-level dropdown group
  const D = (iconD, text, items) =>
    `<div class="menu-item dropdown-btn">${I(iconD)}<span class="menu-text">${text}</span><span class="menu-arrow">&lt;</span></div><div class="submenu">${items}</div>`;
  // standalone top-level nav item (with optional star)
  const N = (pid, iconD, text, star) =>
    `<div class="menu-item nav-item" data-page-id="${pid}">${I(iconD)}<span class="menu-text">${text}</span>${star ? `<svg class="star-icon" data-page-id="${pid}" data-label="${text}" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` : ''}</div>`;

  // icon path constants
  const DASH   = '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>';
  const STAR   = '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>';
  const ADMIN  = '<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/>';
  const USERS  = '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>';
  const BOLT   = '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>';
  const BARS   = '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>';
  const CARD   = '<rect x="2" y="4" width="20" height="16" rx="2"/><line x1="6" y1="12" x2="18" y2="12"/>';
  const LINK2  = '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>';
  const LAYERS = '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>';
  const PAY    = '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>';
  const CHAT   = '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>';
  const BELL   = '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>';
  const WIFI   = '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>';
  const TRASH  = '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>';
  const GEAR   = '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9z"/>';
  const GEARC  = '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 0-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>';
  const PENCIL = '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>';
  const GIFT   = '<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>';
  const PPP    = '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/>';
  const FIX    = '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>';
  const FIXP   = '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>';
  const AP     = '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>';
  const ACS    = '<rect x="2" y="2" width="20" height="6" rx="1"/><rect x="2" y="9" width="20" height="6" rx="1"/><rect x="2" y="16" width="20" height="6" rx="1"/>';
  const BULK   = '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="23" y1="18" x2="17" y2="18"/><line x1="17" y1="14" x2="17" y2="22"/>';
  const PAGE   = '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>';
  const INV    = '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>';
  const UISP   = '<circle cx="12" cy="12" r="2"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>';
  const LOGS   = '<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>';
  const ESC    = '<circle cx="12" cy="12" r="10"/><polyline points="16 12 12 8 8 12"/><line x1="12" y1="16" x2="12" y2="8"/>';
  const SOCIAL = '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>';

  nav.innerHTML = `
    <div class="menu-item" id="dashboardMenuBtn">${I(DASH)}<span class="menu-text">Dashboard</span></div>
    <div class="menu-item" id="favoritesMenuBtn">${I(STAR)}<span class="menu-text">Favourites</span><span class="menu-arrow">&lt;</span></div>

    ${D(ADMIN,'Admin',
      S('registration','Registration')+S('manage-admins','Manage Admins')+S('admins-reports','Admins Reports'))}

    ${D(USERS,'Customers',
      S('add-new-user','Add New User')+S('users','Users')+S('users-location',"User's Location"))}

    ${D(BOLT,'Activation',
      S('activate-user','Activate User')+S('prepaid-users','Prepaid Users')+S('active-users','Active Users')+
      S('expired-users','Expired Users')+S('online-users','Online Users')+S('offline-users','Offline Users')+
      S('roaming-users','Roaming Users')+S('fup-users','FUP Users')+S('compensate','Compensate')+
      S('disable-hotspot','Disable Hotspot Server'))}

    ${D(BARS,'Data Usage',
      S('daily-usage','Daily Usage')+S('weekly-usage','Weekly Usage')+S('monthly-usage','Monthly Usage'))}

    ${D(CARD,'Hotspot Vouchers',
      S('all-vouchers','All Vouchers')+S('add-vouchers','Add Vouchers')+S('print-vouchers','Print Vouchers')+
      S('unused-vouchers','Unused Vouchers')+S('used-vouchers','Used Vouchers')+
      S('voucher-customers','Voucher Customers')+S('voucher-agents','Voucher Agents'))}

    ${D(LINK2,'Hotspot Binding',
      S('all-bindings','All Bindings')+S('active-bindings','Active Bindings')+S('expired-bindings','Expired Bindings')+
      S('bind-user-device','Bind a User/Device')+S('create-binding-speeds','Create Binding Speeds')+
      S('troubleshoot-tv','Troubleshoot TV Binding'))}

    ${D(LAYERS,'Packages/Plans',
      S('hotspot-plans','Hotspot Plans')+S('pppoe-plans','PPPOE Plans')+S('static-ip-plans','Static IP Plans')+
      S('bandwidth-plans','Bandwidth Plans')+S('advanced-bandwidth','Advanced Bandwidth')+
      S('qos','Quality of Service')+S('hotspot-trials','Hotspot Trials')+S('fup','FUP')+
      S('schedule-plans','Schedule Plans')+S('tv-plans','TV Plans'))}

    ${D(PAY,'Transactions',
      S('daily-transactions','Daily Transactions')+S('period-transactions','Period Transactions')+
      S('activation-history','Activation History')+S('comparisons-graphs','Comparisons/Graphs')+
      S('income-overview','Income Overview')+S('stk-push-result','STK Push Result'))}

    ${N('support-ticket',CHAT,'Support Ticket',true)}

    ${D(BELL,'Notifications',
      S('single-user-sms','Single User')+S('bulk-send','Bulk Send')+S('plan-specific','Plan Specific')+
      S('router-specific','Router Specific')+S('schedule-sms','Schedule SMS')+
      S('sms-groups','SMS Groups')+S('sms-history','SMS History'))}

    ${D(WIFI,'Network',
      S('self-install','Self Install')+S('replace-router','Replace Router')+S('routers','Routers')+
      S('ip-pool','IP Pool')+S('router-backups','Router Backups')+S('wireless-settings','Wireless Settings')+
      S('bridge','Bridge')+S('ip-address','IP Address')+S('files-network','Files')+
      S('hotspot-network','Hotspot')+S('ppp','PPP')+S('queues','Queues')+
      S('mikrotik-users','Mikrotik Users')+S('cpu-load','CPU Load')+
      S('mikrotik-monitor','MikroTik Monitor')+S('interface-monitor','Interface Monitor')+
      S('network-discovery','Network Discovery'))}

    ${D(BULK,'Bulk Actions',
      S('mass-delete-users','Mass Delete Users')+S('bulk-edit-expiry','Bulk Edit Expiry Period')+
      S('bulk-edit-plans','Bulk Edit Plans')+S('bulk-edit-routers','Bulk Edit Routers')+
      S('transfer-router','Transfer Router')+S('delete-all-users','Delete ALL Users'))}

    ${D(PAGE,'Static Pages',
      S('order-voucher','Order Voucher')+S('voucher-template','Voucher Template')+
      S('announcement','Announcement')+S('registration-info','Registration Info')+
      S('privacy-policy','Privacy Policy')+S('terms-conditions','Terms and Conditions'))}

    ${D(ACS,'TR069 ACS',
      S('setup-configs','Setup/Configs')+S('all-devices','All Devices')+S('online-devices','Online Devices')+
      S('offline-devices','Offline Devices')+S('assigned-devices','Assigned Devices')+
      S('unassigned-devices','Unassigned Devices'))}

    ${D(AP,'Access Points',
      S('list-aps','List APs')+S('router-chaining','Router Chaining')+S('add-new-ap','Add New'))}

    ${D(PPP,'Access PPPoE Routers',
      S('pppoe-setup','Setup')+S('pppoe-devices','Devices'))}

    ${D(WIFI,'Access Hotspot APs',
      S('hotspot-ap-setup','Setup')+S('add-ap','Add AP')+S('access-aps','Access APs'))}

    ${D(GEAR,'Settings',
      S('general-settings','General Settings')+S('localisation','Localisation')+
      S('dashboard-theme','Dashboard Theme')+S('auto-notifications','Auto Notifications / Reminders')+
      S('import-pppoe','Import PPPOE')+S('administrator-users','Administrator Users')+
      S('payment-gateway','Payment Gateway')+
      P('Withdraw')+'<div class="nested-submenu">'+
        S('withdrawal-requests','Withdrawal')+S('withdrawal-history','Withdrawal History')+
      '</div>'+
      S('active-sessions','Active Sessions')+S('audit-cleanup','Audit &amp; Cleanup')+
      S('clear-cache','Clear Cache'))}

    ${D(GEARC,'PPPoE Settings',
      S('pppoe-settings-setup','Setup')+S('pppoe-troubleshooting','Troubleshooting'))}

    ${N('hotspot-settings',GEARC,'Hotspot Settings')}
    ${N('page-builder',PENCIL,'Page Builder')}

    ${D(GIFT,'Loyalty Points',
      S('loyalty-setup','Setup')+S('loyalty-activity','Activity Report')+S('loyalty-redeemed','Redeemed Points'))}

    ${D(LAYERS,'Extras',
      S('install-app','Install App')+
      P('SMS and WhatsApp')+'<div class="nested-submenu">'+
        S('sms-whatsapp-setup','Setup')+S('sms-send','SMS')+S('whatsapp-send','WhatsApp')+
      '</div>'+
      S('tutorials','Tutorials')+S('human-resource','Human Resource')+S('tax','Tax'))}

    ${D(INV,'Inventory &amp; Expenses',
      S('inventory-dashboard','Dashboard')+S('pos-terminal','POS Terminal')+
      S('sales-history','Sales History')+S('daily-sales','Daily Sales (Z-Report)')+
      S('cash-drawer','Cash Drawer')+S('quotes','Quotes')+S('items','Items')+
      S('categories','Categories')+S('stock-in-out','Stock In/Out')+S('stock-history','Stock History')+
      S('low-stock-alerts','Low Stock Alerts')+S('suppliers','Suppliers')+
      S('purchase-orders','Purchase Orders')+S('expenses','Expenses')+
      S('expense-categories','Expense Categories')+S('recurring-expenses','Recurring Expenses')+
      S('budgets','Budgets')+S('assets','Assets')+S('stock-transfer','Stock Transfer')+
      S('stock-adjustment','Stock Adjustment')+S('inventory-reports','Reports'))}

    ${D(UISP,'UISP',S('uisp-signup','UISP Signup'))}

    ${D(LOGS,'Logs',S('freelspradius','FreeRADIUS')+S('mikrotik-logs','Mikrotik Logs'))}

    ${N('escalate',ESC,'Escalate',true)}
    ${N('social-spot',SOCIAL,'Social Spot/Support',true)}

    ${D(FIX,'Fix Hotspot',
      S('troubleshooting','Troubleshooting')+S('connected-no-internet','Connected Without Internet')+
      S('trojans-tunneling','Trojans / Tunneling')+S('sync-users','Sync Users')+
      S('dns-not-resolving','DNS Not Resolving')+
      S('primary-proxy-unreachable','Primary &amp; Proxy Unreachable')+
      S('cache-full','Cache Full')+S('dhcp-lease-failure','DHCP Lease Failure')+
      S('obtaining-ip','Obtaining IP')+S('couldnt-get-ip',"Couldn't Get IP")+
      S('hotspot-pool-empty','Hotspot Pool Empty'))}

    ${D(FIXP,'Fix PPPoE',
      S('no-response-server','No Response From Server')+
      S('invalid-credentials','Invalid Username or Password')+
      S('checking-username','Stuck on Checking Username')+
      S('dialup-no-internet','Dial-up Connected, No Internet'))}

    ${D(TRASH,'Recycle Bin',S('deleted-items','Deleted Items'))}
  `;
}

/* ══════════════════════════════════════════════════════
   DASHBOARD HTML TEMPLATE
   All sections from index.html moved here.
   ══════════════════════════════════════════════════════ */
function buildDashboardContent() {
  const mainContent = document.getElementById('mainContent');
  if (!mainContent) return;

  mainContent.innerHTML = `
  <div class="dashboard-container">
    <h1 class="dashboard-title">Dashboard</h1>

    <!-- ─ 1. ROUTER VIEW ─────────────────────────────────── -->
    <div class="rainbow-enclosure" style="padding:0;overflow:hidden;">
      <div class="router-view-outer">
        <div class="router-view-header">
          <div class="router-view-header-left">
            <svg class="router-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="6" rx="1"/><rect x="2" y="9" width="20" height="6" rx="1"/><rect x="2" y="16" width="20" height="6" rx="1"/>
              <circle cx="6" cy="5" r="1" fill="currentColor"/><circle cx="6" cy="12" r="1" fill="currentColor"/><circle cx="6" cy="19" r="1" fill="currentColor"/>
            </svg>
            <span>Router View</span>
          </div>
          <input type="text" class="router-search-input" id="router-search" placeholder="🔍 Search routers...">
        </div>
        <div class="router-view-scroll" id="router-grid-container"></div>
        <div class="section-nav-row">
          <button class="nav-btn back" id="rv-back-btn" disabled>Back</button>
          <button class="nav-btn next" id="rv-next-btn">Next</button>
          <button class="nav-btn last" id="rv-last-btn">Last</button>
        </div>
      </div>
    </div>

    <!-- ─ 2. ONLINE USERS (stats grid) ───────────────────── -->
    <div class="live-rainbow-enclosure full-width-section">
      <div class="stats-grid">
        <div class="stat-card color-income-today">
          <div class="stat-card-top">
            <div class="stat-card-left">
              <div class="stat-value" id="stat-income-today">0</div>
              <div class="stat-title">INCOME TODAY <span class="eye-icon">👁</span></div>
            </div>
            <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </div>
          <div class="stat-separator"></div>
          <a class="stat-link" href="data-page.html?page=income-overview">View Reports →</a>
        </div>
        <div class="stat-card color-income-month">
          <div class="stat-card-top">
            <div class="stat-card-left">
              <div class="stat-value" id="stat-income-month">0</div>
              <div class="stat-title">INCOME THIS MONTH <span class="eye-icon">👁</span></div>
            </div>
            <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          </div>
          <div class="stat-separator"></div>
          <a class="stat-link" href="data-page.html?page=income-overview">View Reports →</a>
        </div>
        <div class="stat-card color-active-exp">
          <div class="stat-card-top">
            <div class="stat-card-left">
              <div class="stat-value" id="stat-active-expired">0/0</div>
              <div class="stat-title">ACTIVE / EXPIRED</div>
            </div>
            <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div class="stat-separator"></div>
          <a class="stat-link" href="data-page.html?page=active-users">View All →</a>
        </div>
        <div class="stat-card color-total-users">
          <div class="stat-card-top">
            <div class="stat-card-left">
              <div class="stat-value" id="stat-total-users">0</div>
              <div class="stat-title">TOTAL USERS</div>
            </div>
            <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div class="stat-separator"></div>
          <a class="stat-link" href="data-page.html?page=users">View All →</a>
        </div>
        <div class="stat-card color-hotspot">
          <div class="stat-card-top">
            <div class="stat-card-left">
              <div class="stat-value" id="stat-hotspot-online">0</div>
              <div class="stat-title">HOTSPOT ONLINE USERS</div>
            </div>
            <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20" stroke-width="2"/></svg>
          </div>
          <div class="stat-separator"></div>
          <a class="stat-link" href="data-page.html?page=online-users">View All →</a>
        </div>
        <div class="stat-card color-pppoe">
          <div class="stat-card-top">
            <div class="stat-card-left">
              <div class="stat-value" id="stat-pppoe-online">0</div>
              <div class="stat-title">PPPOE ONLINE USERS</div>
            </div>
            <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M6 15l12 4"/><path d="M6 9l12-4"/></svg>
          </div>
          <div class="stat-separator"></div>
          <a class="stat-link" href="data-page.html?page=online-users">View All →</a>
        </div>
        <div class="stat-card color-static">
          <div class="stat-card-top">
            <div class="stat-card-left">
              <div class="stat-value" id="stat-static-online">0</div>
              <div class="stat-title">STATIC ONLINE USERS</div>
            </div>
            <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>
          </div>
          <div class="stat-separator"></div>
          <a class="stat-link" href="data-page.html?page=online-users">View All →</a>
        </div>
        <div class="stat-card color-total-online">
          <div class="stat-card-top">
            <div class="stat-card-left">
              <div class="stat-value" id="stat-total-online">0</div>
              <div class="stat-title">TOTAL ONLINE USERS</div>
            </div>
            <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div class="stat-separator"></div>
          <a class="stat-link" href="data-page.html?page=online-users">View All →</a>
        </div>
      </div>
    </div>

    <!-- ─ 3. REFRESH BUTTON ───────────────────────────────── -->
    <div class="refresh-container">
      <button class="refresh-btn" id="refresh-users-btn">
        <svg class="refresh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
        </svg>
        Refresh Online Users
      </button>
    </div>

    <!-- ─ 4. MPESA STATUS BAR ─────────────────────────────── -->
    <div class="live-rainbow-enclosure mpesa-status-bar">
      <div class="mpesa-status-content">
        <span class="stk-live-dot"></span>
        <span id="mpesa-status-text">M-Pesa STK Push Service — <span class="highlight-green">Live</span></span>
      </div>
    </div>

    <!-- ─ 5. ROUTER STATUS ────────────────────────────────── -->
    <div class="live-rainbow-enclosure full-width-section">
      <div class="router-status-header">
        <div class="header-title">
          <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/>
            <rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>
          </svg>
          <h2>Router Status</h2>
        </div>
        <div class="header-badges">
          <span class="badge badge-green" id="badge-online"><span>✓</span> 0 Online</span>
          <span class="badge badge-red"   id="badge-offline"><span>✗</span> 0 Offline</span>
        </div>
      </div>
      <div class="router-status-scroll">
        <div class="router-status-grid" id="router-status-grid"></div>
      </div>
      <div class="section-nav-row">
        <button class="nav-btn back" id="rs-back-btn" disabled>Back</button>
        <button class="nav-btn next" id="rs-next-btn">Next</button>
        <button class="nav-btn last" id="rs-last-btn">Last</button>
      </div>
    </div>

    <!-- ─ 6. MONTHLY REGISTERED CUSTOMERS ────────────────── -->
    <div class="live-rainbow-enclosure">
      <div class="chart-panel-header">
        <div class="chart-title">
          <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>
          <h2>Monthly Registered Customers</h2>
        </div>
        <div class="chart-actions">
          <button class="action-btn">−</button>
          <button class="action-btn">×</button>
        </div>
      </div>
      <div class="chart-legend"><span class="legend-color-box members-box"></span> Registered Members (scale: 10 customers / 10 boxes)</div>
      <div class="chart-section-inner">
        <div class="y-axis-col" id="cust-y-axis"></div>
        <div class="chart-content-area">
          <div class="bars-row" id="chart-customers-bars"></div>
        </div>
      </div>
    </div>

    <!-- ─ 7. TOTAL MONTHLY SALES ──────────────────────────── -->
    <div class="live-rainbow-enclosure">
      <div class="chart-panel-header">
        <div class="chart-title">
          <svg class="header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <h2>Total Monthly Sales</h2>
        </div>
        <div class="chart-actions">
          <button class="action-btn">−</button>
          <button class="action-btn">×</button>
        </div>
      </div>
      <div class="chart-legend"><span class="legend-color-box sales-box"></span> Monthly Sales (scale: Ksh 5,000 / 10 boxes)</div>
      <div class="chart-section-inner">
        <div class="y-axis-col" id="sales-y-axis"></div>
        <div class="chart-content-area">
          <div class="bars-row" id="chart-sales-bars"></div>
        </div>
      </div>
    </div>

    <!-- ─ 8. DATA USAGE (3-in-1) ──────────────────────────── -->
    <div class="live-rainbow-enclosure full-width-section">
      <div class="panel-header-simple">
        <h2>Data Usage</h2>
        <div class="mini-chart-legend">
          <span class="legend-pill upload-pill"></span> Upload
          <span class="legend-pill download-pill" style="margin-left:12px"></span> Download
        </div>
      </div>
      <div class="data-usage-panels">
        <div class="data-usage-sub">
          <div class="data-usage-sub-header">
            <span class="data-usage-sub-title">Today's Usage</span>
            <span style="font-size:.72rem;color:#64748b">x-axis: 1 hour / 10 boxes · y-axis: 500 KB / 10 boxes</span>
          </div>
          <div class="usage-chart-area">
            <div class="usage-y-axis" id="today-y-axis"></div>
            <div class="usage-bars-scroll" id="today-bars"></div>
          </div>
        </div>
        <div class="data-usage-sub">
          <div class="data-usage-sub-header">
            <span class="data-usage-sub-title">Weekly Usage</span>
            <span style="font-size:.72rem;color:#64748b">x-axis: days · y-axis: 500 KB / 10 boxes</span>
          </div>
          <div class="usage-chart-area">
            <div class="usage-y-axis" id="week-y-axis"></div>
            <div class="usage-bars-scroll" id="week-bars"></div>
          </div>
        </div>
        <div class="data-usage-sub">
          <div class="data-usage-sub-header">
            <span class="data-usage-sub-title">Monthly Usage</span>
            <span style="font-size:.72rem;color:#64748b">x-axis: months · y-axis: 500 KB / 10 boxes</span>
          </div>
          <div class="usage-chart-area">
            <div class="usage-y-axis" id="month-y-axis"></div>
            <div class="usage-bars-scroll" id="month-bars"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ─ 9. VOUCHERS STOCK ────────────────────────────────── -->
    <div class="live-rainbow-enclosure">
      <div class="panel-header-simple"><h2>Vouchers Stock</h2></div>
      <div class="vouchers-section-inner">
        <table class="vouchers-table">
          <thead><tr><th>PLAN NAME</th><th>UNUSED</th><th>USED</th></tr></thead>
          <tbody id="vouchers-stock-body">
            <tr><td>Hotspot 1hr</td><td>45</td><td>120</td></tr>
            <tr><td>Hotspot Daily</td><td>18</td><td>80</td></tr>
            <tr><td>Hotspot 3Day</td><td>30</td><td>55</td></tr>
            <tr class="total-row"><td class="highlight-cyan">TOTAL</td><td>93</td><td>255</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ─ 10. CUSTOMER GROWTH (LINE graph) ───────────────── -->
    <div class="live-rainbow-enclosure">
      <div class="panel-header-simple">
        <div class="header-title-flex">
          <svg class="chart-growth-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
          <h2>Customers Growth</h2>
        </div>
        <span style="font-size:.72rem;color:#64748b">y-axis: 10 customers / 10 boxes · x-axis: 1 month / 10 boxes</span>
      </div>
      <div class="growth-chart-outer">
        <div class="line-chart-wrapper">
          <div class="line-chart-area">
            <svg id="growth-svg" class="line-chart-svg"></svg>
          </div>
        </div>
      </div>
    </div>

    <!-- ─ 11. USERS EXPIRING TODAY ────────────────────────── -->
    <div class="live-rainbow-enclosure">
      <div class="panel-header-simple"><h2>Users Expiring Today</h2></div>
      <div class="scrollable-table-wrapper expiring-section-inner">
        <table class="equal-cols-table">
          <thead><tr><th>USERNAME</th><th>CREATED ON</th><th>EXPIRES ON</th></tr></thead>
          <tbody id="expiring-users-body"></tbody>
        </table>
      </div>
      <div class="table-pagination" id="expiring-users-pagination"></div>
    </div>

    <!-- ─ 12. ALL USERS INSIGHTS PIE ─────────────────────── -->
    <div class="live-rainbow-enclosure">
      <div class="panel-header-simple" style="justify-content:center;"><h2>All Users Insights</h2></div>
      <div class="pie-section-inner">
        <div class="insights-pie-chart" id="users-pie-chart"></div>
        <div class="pie-chart-legend">
          <span class="legend-item"><span class="legend-color active-color"></span> Active</span>
          <span class="legend-item"><span class="legend-color expired-color"></span> Expired</span>
          <span class="legend-item"><span class="legend-color inactive-color"></span> Inactive</span>
        </div>
      </div>
    </div>

    <!-- ─ 13. BEST SELLING PACKAGES ──────────────────────── -->
    <div class="live-rainbow-enclosure">
      <div class="panel-header-simple"><h2>Best Selling Packages Per Month</h2></div>
      <div class="scrollable-table-wrapper table-section-250">
        <table class="equal-cols-table">
          <thead><tr><th>PACKAGE</th><th>PRICE</th><th>SALES</th><th>REVENUE</th><th>%</th></tr></thead>
          <tbody id="best-selling-body"></tbody>
        </table>
      </div>
      <div class="table-pagination" id="best-selling-pagination"></div>
    </div>

    <!-- ─ 14. LAST 5 TRANSACTIONS ────────────────────────── -->
    <div class="live-rainbow-enclosure">
      <div class="panel-header-simple"><h2>Last 5 Transactions</h2></div>
      <div class="scrollable-table-wrapper table-section-250">
        <table class="equal-cols-table">
          <thead>
            <tr>
              <th>NAME</th><th>NUMBER</th><th>AMOUNT</th><th>DATE</th><th>TRANSACTION ID</th>
            </tr>
          </thead>
          <tbody id="last-trans-body"></tbody>
        </table>
      </div>
      <div class="table-pagination" id="last-trans-pagination"></div>
    </div>

    <!-- ─ 15. TOP 5 DATA USERS ────────────────────────────── -->
    <div class="live-rainbow-enclosure full-width-section">
      <div class="panel-header-simple"><h2>Top 5 Data Users</h2></div>
      <div class="top-users-wrapper">
        <div class="top-users-panel">
          <div class="top-users-panel-header">
            <span class="top-panel-title">Today</span>
            <input class="top-period-input" id="today-period-input" type="text" readonly>
          </div>
          <div class="top-users-table-wrap">
            <table class="top-users-table">
              <thead><tr><th>USERNAME</th><th>DOWNLOAD</th></tr></thead>
              <tbody id="top-daily-body"></tbody>
            </table>
          </div>
        </div>
        <div class="top-users-panel">
          <div class="top-users-panel-header">
            <span class="top-panel-title">Weekly</span>
            <input class="top-period-input" id="week-period-input" type="text" readonly>
          </div>
          <div class="top-users-table-wrap">
            <table class="top-users-table">
              <thead><tr><th>USERNAME</th><th>DOWNLOAD</th></tr></thead>
              <tbody id="top-weekly-body"></tbody>
            </table>
          </div>
        </div>
        <div class="top-users-panel">
          <div class="top-users-panel-header">
            <span class="top-panel-title">Monthly</span>
            <input class="top-period-input" id="month-period-input" type="text" readonly>
          </div>
          <div class="top-users-table-wrap">
            <table class="top-users-table">
              <thead><tr><th>USERNAME</th><th>DOWNLOAD</th></tr></thead>
              <tbody id="top-monthly-body"></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- ─ 16. USERS SERVICE BY TYPE ──────────────────────── -->
    <div class="live-rainbow-enclosure">
      <div class="panel-header-simple"><h2>Users Service By Type</h2></div>
      <div class="scrollable-table-wrapper service-type-inner">
        <table class="equal-cols-table">
          <thead><tr><th>SERVICE TYPE</th><th>USERS</th><th>PERCENTAGE</th></tr></thead>
          <tbody id="service-type-body"></tbody>
        </table>
      </div>
    </div>

    <!-- ─ 17. ACTIVITY LOG ────────────────────────────────── -->
    <div class="live-rainbow-enclosure">
      <div class="panel-header-simple">
        <div class="header-title-flex">
          <svg class="chart-growth-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>
          <h2>Activity Log</h2>
        </div>
      </div>
      <div class="activity-log-inner">
        <div class="activity-item-box">
          <div class="activity-time">2 hours, 39 min ago</div>
          <div class="activity-details">[admin]: Page Builder — Saved and uploaded theme #17 to router #18 (country=kenya, currency=KES)</div>
        </div>
        <div class="activity-item-box">
          <div class="activity-time">2 hours, 40 min ago</div>
          <div class="activity-details">[admin]: Hotspot Settings — clicked Save Changes; saved (free_trial: "disable" → "enable"; enable_advert: "disable" → "enable")</div>
        </div>
        <div class="activity-item-box">
          <div class="activity-time">2 hours, 43 min ago</div>
          <div class="activity-details">[admin]: Page Builder — Updated global settings on theme #17 (fields: page_template, business_name, phone, colors, fonts)</div>
        </div>
        <div class="activity-item-box">
          <div class="activity-time">3 hours, 5 min ago</div>
          <div class="activity-details">[admin]: User Activated — user042 activated on Hotspot Daily plan via Ksh 80 M-Pesa payment (TXN1000042)</div>
        </div>
        <div class="activity-item-box">
          <div class="activity-time">3 hours, 22 min ago</div>
          <div class="activity-details">[admin]: Router Sync — Main-Router synced successfully (8 active sessions, 2 expired)</div>
        </div>
      </div>
    </div>

  </div><!-- /.dashboard-container -->
  `;
}

/* ══════════════════════════════════════════════════════
   DATA-PAGE CONTENT RENDERER
   ══════════════════════════════════════════════════════ */
function buildDataPageContent() {
  const mainContent = document.getElementById('mainContent');
  if (!mainContent) return;

  const params = new URLSearchParams(window.location.search);
  const pid    = params.get('page') || '';
  const entry  = PAGE_CONTENT[pid];

  mainContent.innerHTML = `
  <div class="dashboard-container">
    <div style="margin-bottom:16px">
      <a href="index.html" style="color:#00f0ff;font-size:.82rem;text-decoration:none;display:inline-flex;align-items:center;gap:6px;">
        <svg style="width:14px;height:14px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        Back to Dashboard
      </a>
    </div>
    <h1 class="dashboard-title" id="page-content-title">${entry ? entry.title : 'Page Not Found'}</h1>
    <div class="live-rainbow-enclosure">
      <div id="page-content-body">${entry ? entry.body : placeholder('404', 'The requested page does not exist.')}</div>
    </div>
  </div>`;

  if (entry) {
    document.title = entry.title + ' — Admin';
  }
}

/* ══════════════════════════════════════════════════════
   FAVOURITES  store
   ══════════════════════════════════════════════════════ */
let favourites = JSON.parse(localStorage.getItem('admin_favourites') || '[]');
function saveFavourites() { localStorage.setItem('admin_favourites', JSON.stringify(favourites)); }
function addFavourite(id, label) {
  if (!favourites.find(f => f.id === id)) { favourites.push({ id, label }); saveFavourites(); }
}
function removeFavourite(id) {
  favourites = favourites.filter(f => f.id !== id);
  saveFavourites();
}
function isFavourite(id) { return !!favourites.find(f => f.id === id); }

/* ══════════════════════════════════════════════════════
   MAIN DOMContentLoaded  BOOTSTRAP
   ══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // 1. Render the correct page content
  if (IS_DATA_PAGE) {
    buildDataPageContent();
  } else {
    buildDashboardContent();
  }

  // 2. Build sidebar (after content so star state can be restored)
  buildSidebarNav();

  const navToggleBtn      = document.getElementById('navToggleBtn');
  const closePanelBtn     = document.getElementById('closePanelBtn');
  const sidebarPanel      = document.getElementById('sidebarPanel');
  const favoritesDropdown = document.getElementById('favoritesDropdown');
  const favoritesList     = document.getElementById('favoritesList');
  const favCloseBtn       = document.getElementById('favoritesCloseBtn');

  /* ── open / close sidebar ── */
  function openSidebar()  { sidebarPanel?.classList.add('open'); }
  function closeSidebar() { sidebarPanel?.classList.remove('open'); }
  navToggleBtn?.addEventListener('click', e => { e.stopPropagation(); openSidebar(); });
  closePanelBtn?.addEventListener('click', e => { e.stopPropagation(); closeSidebar(); });

  /* ── close sidebar on overlay tap (mobile) ── */
  document.addEventListener('click', e => {
    if (sidebarPanel?.classList.contains('open') &&
        !sidebarPanel.contains(e.target) &&
        e.target !== navToggleBtn) {
      closeSidebar();
    }
  });

  /* ── Main menu dropdown toggles ── */
  document.querySelectorAll('.menu-item.dropdown-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      const next = btn.nextElementSibling;
      if (next?.classList.contains('submenu')) {
        const isOpen = next.classList.contains('show');
        document.querySelectorAll('.submenu.show').forEach(s => {
          if (s !== next) { s.classList.remove('show'); s.previousElementSibling?.classList.remove('open'); }
        });
        next.classList.toggle('show', !isOpen);
        btn.classList.toggle('open', !isOpen);
      }
    });
  });

  /* ── Nested submenu toggles (3rd level) ── */
  document.querySelectorAll('.submenu-item.has-nested').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      const next = item.nextElementSibling;
      if (next?.classList.contains('nested-submenu')) {
        next.classList.toggle('show');
        item.classList.toggle('open');
      }
    });
  });

  /* ── Stars ── */
  function renderFavouritesList() {
    if (!favoritesList) return;
    if (favourites.length === 0) {
      favoritesList.innerHTML = '<div class="favorites-empty">No favourites yet.<br>Click ★ next to any menu item.</div>';
    } else {
      favoritesList.innerHTML = favourites.map(f => `
        <div class="favorite-nav-item" data-page-id="${f.id}">
          <svg class="fav-icon" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          ${f.label}
        </div>`).join('');
      favoritesList.querySelectorAll('.favorite-nav-item').forEach(el => {
        el.addEventListener('click', () => {
          const pid2 = el.dataset.pageId;
          if (pid2) navigateTo(pid2);
          hideFavourites();
          closeSidebar();
        });
      });
    }
  }

  document.querySelectorAll('.star-icon[data-page-id]').forEach(star => {
    const pid2   = star.dataset.pageId;
    const label = star.dataset.label || pid2;
    if (isFavourite(pid2)) star.classList.add('starred');
    star.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      if (isFavourite(pid2)) {
        removeFavourite(pid2);
        document.querySelectorAll(`.star-icon[data-page-id="${pid2}"]`).forEach(s => s.classList.remove('starred'));
      } else {
        addFavourite(pid2, label);
        document.querySelectorAll(`.star-icon[data-page-id="${pid2}"]`).forEach(s => s.classList.add('starred'));
      }
      renderFavouritesList();
    });
  });

  /* ── Favourites menu item ── */
  function showFavourites() {
    renderFavouritesList();
    favoritesDropdown?.classList.add('show');
  }
  function hideFavourites() { favoritesDropdown?.classList.remove('show'); }

  document.getElementById('favoritesMenuBtn')?.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    if (favoritesDropdown?.classList.contains('show')) hideFavourites(); else showFavourites();
  });
  favCloseBtn?.addEventListener('click', hideFavourites);

  /* ── All nav-item clicks ── */
  document.querySelectorAll('.nav-item[data-page-id]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      navigateTo(el.dataset.pageId);
      closeSidebar();
    });
  });

  /* ── Dashboard button ── */
  document.getElementById('dashboardMenuBtn')?.addEventListener('click', e => {
    e.preventDefault(); e.stopPropagation();
    window.location.href = 'index.html';
    closeSidebar();
  });

  /* ── Sidebar search filter ── */
  document.querySelector('.sidebar-search-input')?.addEventListener('input', function() {
    const q = this.value.toLowerCase();
    document.querySelectorAll('.menu-item, .submenu-item').forEach(item => {
      const text = item.querySelector('.menu-text')?.textContent.toLowerCase() || '';
      item.style.display = (!q || text.includes(q)) ? '' : 'none';
    });
  });

  /* ── Restore starred state on data-page stars ── */
  if (IS_DATA_PAGE) {
    document.querySelectorAll('.star-icon[data-page-id]').forEach(star => {
      if (isFavourite(star.dataset.pageId)) star.classList.add('starred');
    });
  }

  /* ── Dashboard-only initialisation ── */
  if (!IS_DATA_PAGE) {
    initRouterViewCarousel();
    initRouterStatusCarousel();
    initBarCharts();
    initDataUsageCharts();
    initGrowthLineChart();
    initExpiringUsersPagination();
    initBestSellingPagination();
    initLastTransactionsPagination();
    setTodayInput();
    setWeekInput();
    setMonthInput();
    seedTopUsers('top-daily-body',   TOP_DAILY);
    seedTopUsers('top-weekly-body',  TOP_WEEKLY);
    seedTopUsers('top-monthly-body', TOP_MONTHLY);
    const svcBody = document.getElementById('service-type-body');
    if (svcBody) svcBody.innerHTML = [
      {type:'Hotspot', users:342, pct:'54%'},
      {type:'PPPoE',   users:201, pct:'32%'},
      {type:'Static',  users: 89, pct:'14%'},
    ].map(r=>`<tr><td>${r.type}</td><td>${r.users}</td><td>${r.pct}</td></tr>`).join('');
  }
});

/* ══════════════════════════════════════════════════════
   NAVIGATION HELPER
   ══════════════════════════════════════════════════════ */
function navigateTo(pageId) {
  window.location.href = `data-page.html?page=${encodeURIComponent(pageId)}`;
}

/* ══════════════════════════════════════════════════════
   ROUTER VIEW  CAROUSEL
   ══════════════════════════════════════════════════════ */
function initRouterViewCarousel() {
  const container = document.getElementById('router-grid-container');
  if (!container) return;

  const allRouters = Array.from({ length: 18 }, (_, i) => ({
    name: `Router-${String(i+1).padStart(2,'0')}`,
    online: Math.floor(Math.random()*40),
    total:  Math.floor(Math.random()*80)+10,
    offline: Math.floor(Math.random()*5),
  }));

  const PAGE_SIZE_ROWS = 5;
  let pageIndex = 0;
  let searchTerm = '';

  function filtered() {
    return searchTerm ? allRouters.filter(r => r.name.toLowerCase().includes(searchTerm)) : allRouters;
  }
  function getColsPerPage() { const w = container.clientWidth || 300; return Math.max(1, Math.floor((w + 20) / 120)); }
  function getPageSize() { return getColsPerPage() * PAGE_SIZE_ROWS; }
  function totalPages() { return Math.ceil(filtered().length / getPageSize()); }

  function renderPage() {
    const routers = filtered();
    const ps = getPageSize();
    const tp = Math.ceil(routers.length / ps);
    if (pageIndex >= tp) pageIndex = Math.max(0, tp - 1);
    const slice = routers.slice(pageIndex * ps, (pageIndex + 1) * ps);
    container.innerHTML = '';
    const grid = document.createElement('div');
    grid.className = 'router-cards-page';
    grid.style.cssText = 'display:flex;flex-wrap:wrap;gap:5px 20px;align-content:flex-start;';
    if (slice.length === 0) {
      grid.innerHTML = '<div style="padding:20px;color:#64748b;font-size:.8rem">No routers match your search.</div>';
    } else {
      slice.forEach(r => {
        const card = document.createElement('div');
        card.className = 'router-mini-card';
        card.innerHTML = `<div class="rmc-name">${r.name}</div>
          <div class="rmc-stats">
            <span class="rmc-online">●&nbsp;${r.online}</span>
            <span class="rmc-total">✓&nbsp;${r.total}</span>
            <span class="rmc-offline">✗&nbsp;${r.offline}</span>
          </div>`;
        card.title = r.name;
        grid.appendChild(card);
      });
    }
    container.appendChild(grid);
    const backBtn = document.getElementById('rv-back-btn');
    const nextBtn = document.getElementById('rv-next-btn');
    const lastBtn = document.getElementById('rv-last-btn');
    const tp2 = totalPages();
    if (backBtn) backBtn.disabled = pageIndex === 0;
    if (nextBtn) nextBtn.disabled = pageIndex >= tp2 - 1;
    if (lastBtn) lastBtn.disabled = pageIndex >= tp2 - 1;
  }

  document.getElementById('rv-back-btn')?.addEventListener('click', () => { if (pageIndex > 0) { pageIndex--; renderPage(); } });
  document.getElementById('rv-next-btn')?.addEventListener('click', () => { if (pageIndex < totalPages()-1) { pageIndex++; renderPage(); } });
  document.getElementById('rv-last-btn')?.addEventListener('click', () => { pageIndex = totalPages()-1; renderPage(); });
  document.getElementById('router-search')?.addEventListener('input', function() {
    searchTerm = this.value.toLowerCase().trim(); pageIndex = 0; renderPage();
  });

  let swipeX = 0;
  container.addEventListener('touchstart', e => { swipeX = e.changedTouches[0].clientX; }, { passive: true });
  container.addEventListener('touchend', e => {
    const dx = swipeX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) {
      if (dx > 0 && pageIndex < totalPages()-1) { pageIndex++; renderPage(); }
      else if (dx < 0 && pageIndex > 0) { pageIndex--; renderPage(); }
    }
  }, { passive: true });

  renderPage();
  window.addEventListener('resize', renderPage);
}

/* ══════════════════════════════════════════════════════
   ROUTER STATUS  CAROUSEL
   ══════════════════════════════════════════════════════ */
function initRouterStatusCarousel() {
  const grid = document.getElementById('router-status-grid');
  if (!grid) return;

  const statuses = [
    { name:'Main-Router', status:'online',  last:'', ip:'192.168.88.1' },
    { name:'Branch-01',   status:'offline', last:'2025-07-16 14:22', ip:'192.168.90.1' },
    { name:'AP-East',     status:'online',  last:'', ip:'10.0.1.2' },
    { name:'AP-West',     status:'offline', last:'2025-07-14 09:10', ip:'10.0.2.2' },
    { name:'Core-Switch', status:'online',  last:'', ip:'192.168.1.254' },
    { name:'Backup-RTR',  status:'offline', last:'2025-07-10 07:00', ip:'192.168.99.1' },
    { name:'PPPoE-SRV',   status:'online',  last:'', ip:'10.10.0.1' },
    { name:'AR-North',    status:'offline', last:'2025-07-15 18:45', ip:'172.16.0.5' },
  ];

  const PAGE = 6;
  let pageIdx = 0;
  const total = () => Math.ceil(statuses.length / PAGE);

  function render() {
    const slice = statuses.slice(pageIdx * PAGE, (pageIdx+1) * PAGE);
    const online  = slice.filter(r => r.status==='online').length;
    const offline = slice.filter(r => r.status==='offline').length;
    const ob = document.getElementById('badge-online');
    const ofb = document.getElementById('badge-offline');
    if (ob)  ob.innerHTML  = `<span>✓</span> ${online} Online`;
    if (ofb) ofb.innerHTML = `<span>✗</span> ${offline} Offline`;
    grid.innerHTML = slice.map(r => `
      <div class="router-status-card ${r.status}">
        <div class="card-left">
          <div class="status-circle-offline ${r.status === 'online' ? 'status-circle-online' : ''}">
            ${r.status === 'online' ? '✓' : '✗'}
          </div>
        </div>
        <div class="card-center">
          <div class="router-title">${r.name}</div>
          <div class="router-sub-status">
            ${r.status === 'online'
              ? '<span style="color:#00aa66">● Online</span>'
              : `<span style="color:#cc2a36">● Offline</span> <span style="color:#64748b">Last seen: ${r.last}</span>`}
          </div>
          <button class="card-refresh-btn" onclick="alert('Refreshing ${r.name}...')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"/>
            </svg> Refresh
          </button>
        </div>
        <div class="card-right">${r.ip}</div>
      </div>`).join('');
    const backBtn = document.getElementById('rs-back-btn');
    const nextBtn = document.getElementById('rs-next-btn');
    const lastBtn = document.getElementById('rs-last-btn');
    if (backBtn) backBtn.disabled = pageIdx === 0;
    if (nextBtn) nextBtn.disabled = pageIdx >= total()-1;
    if (lastBtn) lastBtn.disabled = pageIdx >= total()-1;
  }

  document.getElementById('rs-back-btn')?.addEventListener('click', () => { if (pageIdx>0){pageIdx--; render();} });
  document.getElementById('rs-next-btn')?.addEventListener('click', () => { if (pageIdx<total()-1){pageIdx++; render();} });
  document.getElementById('rs-last-btn')?.addEventListener('click', () => { pageIdx=total()-1; render(); });
  render();
}

/* ══════════════════════════════════════════════════════
   BAR CHARTS
   ══════════════════════════════════════════════════════ */
function initBarCharts() {
  const months   = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const custData = [23, 45, 30, 60, 42, 55, 38, 71, 50, 33, 67, 48];
  const salesData= [8500,12200,9800,15300,11000,13700,10500,18200,14600,9300,16800,12900];
  const CUST_SCALE = 270 / 100;
  const SALES_SCALE = 270 / 30000;

  function buildBars(containerId, data, scale, isBlue) {
    const c = document.getElementById(containerId);
    if (!c) return;
    data.forEach((val, i) => {
      const h = Math.round(val * scale);
      const col = document.createElement('div');
      col.className = 'bar-group';
      col.innerHTML = `<div class="bar-fill ${isBlue?'purple':''}" style="height:${h}px"></div>
                       <div class="bar-label">${months[i]}</div>`;
      c.appendChild(col);
    });
  }
  function buildYAxis(containerId, steps, maxVal) {
    const c = document.getElementById(containerId);
    if (!c) return;
    for (let v = 0; v <= maxVal; v += steps) {
      const s = document.createElement('span');
      s.textContent = v;
      s.style.height = (steps / maxVal * 270) + 'px';
      s.style.display = 'flex';
      s.style.alignItems = 'flex-end';
      c.appendChild(s);
    }
  }
  buildYAxis('cust-y-axis', 10, 100);
  buildYAxis('sales-y-axis', 5000, 30000);
  buildBars('chart-customers-bars', custData, CUST_SCALE, false);
  buildBars('chart-sales-bars', salesData, SALES_SCALE, true);
}

/* ══════════════════════════════════════════════════════
   DATA USAGE CHARTS
   ══════════════════════════════════════════════════════ */
function initDataUsageCharts() {
  const hourLabels  = Array.from({length:24}, (_,i) => i+'h');
  const todayUp     = hourLabels.map(() => Math.random()*300);
  const todayDown   = hourLabels.map(() => Math.random()*600);
  const dayLabels   = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const weekUp      = dayLabels.map(() => Math.random()*2000);
  const weekDown    = dayLabels.map(() => Math.random()*4000);
  const monthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const monthUp     = monthLabels.map(() => Math.random()*8000);
  const monthDown   = monthLabels.map(() => Math.random()*16000);

  function renderUsageChart(barsId, yAxisId, labels, upData, downData, maxVal) {
    const barsC  = document.getElementById(barsId);
    const yAxisC = document.getElementById(yAxisId);
    if (!barsC || !yAxisC) return;
    const CHART_H = 130;
    const scale   = CHART_H / maxVal;
    const steps = maxVal / 5;
    for (let v = 0; v <= maxVal; v += steps) {
      const s = document.createElement('span');
      s.textContent = v >= 1000 ? (v/1000).toFixed(0)+'MB' : v+'KB';
      s.style.height = (steps/maxVal*CHART_H) + 'px';
      s.style.display = 'flex'; s.style.alignItems = 'flex-end';
      yAxisC.appendChild(s);
    }
    labels.forEach((lbl, i) => {
      const col = document.createElement('div');
      col.className = 'usage-bar-col';
      col.innerHTML = `<div class="dual-bars">
        <div class="bar-upload"   style="height:${Math.round(upData[i]*scale)}px"></div>
        <div class="bar-download" style="height:${Math.round(downData[i]*scale)}px"></div>
      </div>
      <div class="x-axis-label">${lbl}</div>`;
      barsC.appendChild(col);
    });
  }
  renderUsageChart('today-bars','today-y-axis',  hourLabels,  todayUp,  todayDown, 600);
  renderUsageChart('week-bars', 'week-y-axis',   dayLabels,   weekUp,   weekDown,  5000);
  renderUsageChart('month-bars','month-y-axis',  monthLabels, monthUp,  monthDown, 20000);
}

/* ══════════════════════════════════════════════════════
   CUSTOMER GROWTH  LINE CHART
   ══════════════════════════════════════════════════════ */
function initGrowthLineChart() {
  const svg = document.getElementById('growth-svg');
  if (!svg) return;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const data   = [12,20,18,35,30,50,45,65,60,80,75,95];
  const W = 700, H = 250;
  const padL = 50, padB = 30, padT = 10, padR = 20;
  const cW = W - padL - padR, cH = H - padB - padT;
  const maxY = 100;
  let gridHtml = '';
  for (let v = 0; v <= maxY; v += 10) {
    const y = padT + cH - (v / maxY * cH);
    gridHtml += `<line x1="${padL}" y1="${y}" x2="${W-padR}" y2="${y}" stroke="rgba(29,35,48,.6)" stroke-width="1"/>`;
    gridHtml += `<text x="${padL-4}" y="${y+4}" font-size="9" fill="#5a647e" text-anchor="end">${v}</text>`;
  }
  for (let i = 0; i < months.length; i++) {
    const x = padL + (i / (months.length-1)) * cW;
    gridHtml += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${H-padB}" stroke="rgba(29,35,48,.6)" stroke-width="1"/>`;
    gridHtml += `<text x="${x}" y="${H-padB+14}" font-size="9" fill="#5a647e" text-anchor="middle">${months[i]}</text>`;
  }
  const pts = data.map((v,i) => ({ x: padL + (i/(months.length-1))*cW, y: padT + cH - (v/maxY*cH) }));
  const linePts  = pts.map(p => `${p.x},${p.y}`).join(' ');
  const areaPts  = `${pts[0].x},${H-padB} ` + pts.map(p => `${p.x},${p.y}`).join(' ') + ` ${pts[pts.length-1].x},${H-padB}`;
  const dotsHtml = pts.map(p => `<circle cx="${p.x}" cy="${p.y}" r="4" fill="#fff" stroke="#00f0ff" stroke-width="2"/>`).join('');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.innerHTML = `
    <defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#00f0ff" stop-opacity=".4"/>
      <stop offset="100%" stop-color="#00f0ff" stop-opacity="0"/>
    </linearGradient></defs>
    ${gridHtml}
    <polygon points="${areaPts}" fill="url(#areaGrad)" opacity=".3"/>
    <polyline points="${linePts}" fill="none" stroke="#00f0ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${dotsHtml}`;
}

/* ══════════════════════════════════════════════════════
   TABLE PAGINATION helpers
   ══════════════════════════════════════════════════════ */
function buildTablePagination(containerId, paginationId, data, renderRow, pageSize) {
  const tbody = document.getElementById(containerId);
  const pagEl = document.getElementById(paginationId);
  if (!tbody || !pagEl) return;
  let page = 0;
  const total = () => Math.ceil(data.length / pageSize);
  function render() {
    const slice = data.slice(page * pageSize, (page+1)*pageSize);
    tbody.innerHTML = slice.length ? slice.map(renderRow).join('') : `<tr><td colspan="10" style="text-align:center;color:#64748b;padding:20px">No data available</td></tr>`;
    renderPag();
  }
  function renderPag() {
    pagEl.innerHTML = `
      <button class="nav-btn back" id="${paginationId}-back" ${page===0?'disabled':''}>Back</button>
      <button class="nav-btn next" id="${paginationId}-next" ${page>=total()-1?'disabled':''}>Next</button>
      <button class="nav-btn last" id="${paginationId}-last" ${page>=total()-1?'disabled':''}>Last</button>`;
    pagEl.querySelector(`#${paginationId}-back`)?.addEventListener('click', () => { if (page>0){page--; render();} });
    pagEl.querySelector(`#${paginationId}-next`)?.addEventListener('click', () => { if (page<total()-1){page++; render();} });
    pagEl.querySelector(`#${paginationId}-last`)?.addEventListener('click', () => { page=total()-1; render(); });
  }
  render();
}

function initExpiringUsersPagination() {
  const data = Array.from({length:15}, (_,i) => ({
    username: `user${String(i+1).padStart(3,'0')}`,
    created:  `2025-0${(i%9)+1}-${String((i*3%28)+1).padStart(2,'0')}`,
    expires:  `2025-07-${String(i+17).padStart(2,'0')}`
  }));
  buildTablePagination('expiring-users-body','expiring-users-pagination', data,
    r => `<tr><td class="user-link">${r.username}</td><td>${r.created}</td><td>${r.expires}</td></tr>`, 5);
}

function initBestSellingPagination() {
  const pkgs = ['Hotspot 1hr','Hotspot Daily','PPPOE 5Mbps','PPPOE 10Mbps','Static 2Mbps','Hotspot 3Day','Monthly Unlim','Weekly 3Mbps'];
  const data = pkgs.map((p,i) => ({
    pkg: p, price: [20,80,500,800,1200,200,2500,600][i],
    sales: [120,80,45,32,18,55,22,40][i],
    rev: [2400,6400,22500,25600,21600,11000,55000,24000][i],
    pct: [18,12,7,5,3,8,3,6][i]
  }));
  buildTablePagination('best-selling-body','best-selling-pagination', data,
    r => `<tr><td>${r.pkg}</td><td>Ksh ${r.price}</td><td>${r.sales}</td><td>Ksh ${r.rev.toLocaleString()}</td><td>${r.pct}%</td></tr>`, 5);
}

function initLastTransactionsPagination() {
  const names   = ['John Kamau','Mary Wanjiru','Peter Ochieng','Alice Njeri','Samuel Mwangi','Grace Auma','David Kiprop'];
  const phones  = ['0712345678','0723456789','0734567890','0745678901','0756789012','0767890123','0778901234'];
  const data = names.map((n,i) => ({
    name: n, phone: phones[i],
    amount: [80,200,500,80,800,200,500][i],
    date:   `2025-07-${String(17-i).padStart(2,'0')}`,
    txnId:  'TXN'+String(1000+i*37).padStart(6,'0')
  }));
  buildTablePagination('last-trans-body','last-trans-pagination', data,
    r => `<tr><td class="user-link">${r.name}</td><td style="color:#8892b0;font-size:.75rem">${r.phone}</td><td>Ksh ${r.amount}</td><td>${r.date}</td><td style="font-size:.72rem;color:#64748b">${r.txnId}</td></tr>`, 5);
}

/* ── Top 5 Data Users period inputs ── */
function setTodayInput() {
  const el = document.getElementById('today-period-input');
  if (el) el.value = new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'short',year:'numeric'});
}
function setWeekInput() {
  const el = document.getElementById('week-period-input');
  if (el) {
    const now  = new Date();
    const start = new Date(now); start.setDate(now.getDate() - now.getDay());
    const end   = new Date(start); end.setDate(start.getDate()+6);
    el.value = `Week ${Math.ceil(now.getDate()/7)} · ${start.toLocaleDateString('en-GB',{day:'numeric',month:'short'})} – ${end.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}`;
  }
}
function setMonthInput() {
  const el = document.getElementById('month-period-input');
  if (el) el.value = new Date().toLocaleDateString('en-GB',{month:'long',year:'numeric'});
}

function seedTopUsers(tbodyId, data) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  tbody.innerHTML = data.map((r,i) => `<tr><td>${i+1}. ${r.name}</td><td>${r.dl}</td></tr>`).join('');
}

const TOP_DAILY = [
  {name:'user042',dl:'4.2 GB'},{name:'user017',dl:'3.8 GB'},{name:'user093',dl:'3.1 GB'},
  {name:'user006',dl:'2.9 GB'},{name:'user055',dl:'2.5 GB'}
];
const TOP_WEEKLY = [
  {name:'user017',dl:'28.1 GB'},{name:'user093',dl:'24.7 GB'},{name:'user042',dl:'22.3 GB'},
  {name:'user031',dl:'19.8 GB'},{name:'user077',dl:'17.2 GB'}
];
const TOP_MONTHLY = [
  {name:'user093',dl:'112 GB'},{name:'user017',dl:'98 GB'},{name:'user042',dl:'87 GB'},
  {name:'user031',dl:'74 GB'},{name:'user055',dl:'61 GB'}
];
