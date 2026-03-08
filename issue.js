const API_URL = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';

const fetchSingleIssue = async id => {
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  return await res.json();
};

const fetchAllIssues = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

const updateTabStyles = activeType => {
  const btnAll = document.getElementById('btn-all');
  const btnOpen = document.getElementById('btn-open');
  const btnClosed = document.getElementById('btn-closed');

  const buttons = [btnAll, btnOpen, btnClosed];

  buttons.forEach(btn => {
    if (!btn) return;
    if (btn.id === `btn-${activeType}`) {
      btn.className =
        'px-8 py-2 rounded-md bg-[#4A00FF] text-white font-medium border border-[#4A00FF] transition-all';
    } else {
      btn.className =
        'px-8 py-2 rounded-md bg-white text-gray-600 border border-gray-200 font-medium hover:bg-gray-50 transition-all';
    }
  });
};

const renderTags = labels => {
  if (!labels || !Array.isArray(labels)) return '';
  return labels
    .map(label => {
      const lower = label.toLowerCase().trim();
      if (lower === 'bug') {
        return `<span class="flex items-center gap-1 px-2 py-0.5 bg-[#FFF0F0] text-[#FF5C5C] text-[10px] font-bold rounded-full border border-[#FF5C5C]/20 uppercase">
                <i class="fa-solid fa-circle-dot text-[8px]"></i> BUG
              </span>`;
      }
      if (lower === 'help wanted') {
        return `<span class="flex items-center gap-1 px-2 py-0.5 bg-[#FFF9EB] text-[#FDB022] text-[10px] font-bold rounded-full border border-[#FDB022]/20 uppercase">
                <i class="fa-solid fa-circle-dot text-[8px]"></i> HELP WANTED
              </span>`;
      }
      if (lower === 'enhancement') {
        return `<span class="flex items-center gap-1 px-2 py-0.5 bg-[#F0FDF4] text-[#22C55E] text-[10px] font-bold rounded-full border border-[#22C55E]/20 uppercase">
                <i class="fa-solid fa-circle-dot text-[8px]"></i> ENHANCEMENT
              </span>`;
      }
      return '';
    })
    .join('');
};

const container = document.getElementById('issuesContainer');
const loader = document.getElementById('loader');
const countDisplay = document.getElementById('issueCountDisplay');

const showIssueModal = async id => {
  try {
    const result = await fetchSingleIssue(id);
    const issue = result.data;

    let modalContainer = document.getElementById('modalContainer');
    if (!modalContainer) {
      modalContainer = document.createElement('div');
      modalContainer.id = 'modalContainer';
      document.body.appendChild(modalContainer);
    }

    modalContainer.innerHTML = `
      <div class="fixed inset-0 bg-[#00000080] flex items-center justify-center z-50 p-4">
        <div class="bg-white w-full max-w-[600px] rounded-lg p-8 shadow-2xl relative animate-fadeIn">
          <h2 class="text-[22px] font-bold text-[#111827] mb-2">${issue.title}</h2>
          <div class="flex items-center gap-2 mb-6">
             <span class="bg-[#22C55E] text-white text-[12px] px-3 py-1 rounded-full flex items-center gap-1">
                <i class="fa-regular fa-circle-dot"></i> Opened
             </span>
             <span class="text-[#6B7280] text-[13px]">• Opened by Jakaria Ahmed • 22/02/2026</span>
          </div>
          <div class="flex gap-2 mb-6">${renderTags(issue.labels || issue.tags)}</div>
          <p class="text-[#6B7280] text-[14px] leading-relaxed mb-10">${issue.description || 'No detailed description.'}</p>
          <div class="flex justify-between items-start mb-8">
            <div><p class="text-[#6B7280] text-[13px] mb-1">Assignee:</p><p class="font-bold text-[#111827]">Jakaria Ahmed</p></div>
            <div class="text-right"><p class="text-[#6B7280] text-[13px] mb-1">Priority:</p>
            <span class="bg-[#FFF0F0] text-[#FF5C5C] text-[10px] font-bold px-3 py-1 rounded uppercase">${issue.priority || 'HIGH'}</span></div>
          </div>
          <div class="flex justify-end"><button onclick="this.closest('#modalContainer').innerHTML=''" class="bg-[#4A00FF] text-white px-6 py-2 rounded-md font-bold text-[14px]">Close</button></div>
        </div>
      </div>`;
  } catch (err) {
    console.error(err);
  }
};

const loadIssues = async (type = 'all') => {
  try {
    if (loader) loader.classList.remove('hidden');
    container.innerHTML = '';
    updateTabStyles(type);

    const result = await fetchAllIssues();
    let issues = result.data || [];

    if (type === 'open')
      issues = issues.filter(i => i.status?.toLowerCase() === 'open');
    if (type === 'closed')
      issues = issues.filter(i => i.status?.toLowerCase() === 'closed');

    if (countDisplay) countDisplay.innerText = `${issues.length} Issues`;

    issues.forEach(issue => {
      const isOpen = issue.status?.toLowerCase() === 'open';
      const statusIcon = isOpen
        ? './assets/Open-Status.png'
        : './assets/Closed- Status .png';
      const borderColor = isOpen ? 'border-[#22C55E]' : 'border-[#A855F7]';
      const priority = (issue.priority || 'Medium').toUpperCase();

      let priorityClass = 'bg-[#F2F4F7] text-[#667085]';
      if (priority === 'HIGH') priorityClass = 'bg-[#FFF0F0] text-[#FF5C5C]';
      if (priority === 'MEDIUM') priorityClass = 'bg-[#FFF9EB] text-[#FDB022]';

      const card = document.createElement('div');
      card.className = `bg-white p-6 rounded-[4px] border-t-[4px] ${borderColor} shadow-[0px_2px_8px_rgba(0,0,0,0.06)] flex flex-col justify-between cursor-pointer hover:shadow-lg transition-all`;
      card.onclick = () => showIssueModal(issue._id || issue.id);

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-4">
            <img src="${statusIcon}" class="w-6 h-6 object-contain">
            <span class="px-2 py-0.5 text-[10px] font-bold rounded uppercase ${priorityClass}">${priority}</span>
          </div>
          <h3 class="font-bold text-[16px] text-[#111827] mb-2 leading-tight">${issue.title}</h3>
          <p class="text-[13px] text-[#6B7280] mb-5 line-clamp-2">${issue.description || 'No description available...'}</p>
          <div class="flex flex-wrap gap-2 mb-6">${renderTags(issue.labels || issue.tags)}</div>
        </div>
        <div class="mt-auto pt-4 text-[12px] text-[#6B7280] font-medium border-t border-gray-50">
          <p>#1 by Jakaria Ahmed</p>
          <p>22/02/2026</p>
        </div>`;
      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  } finally {
    if (loader) loader.classList.add('hidden');
  }
};


document
  .getElementById('btn-all')
  ?.addEventListener('click', () => loadIssues('all'));
document
  .getElementById('btn-open')
  ?.addEventListener('click', () => loadIssues('open'));
document
  .getElementById('btn-closed')
  ?.addEventListener('click', () => loadIssues('closed'));

loadIssues();
