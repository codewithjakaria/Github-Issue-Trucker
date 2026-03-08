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


const updateTabStyles = (activeType) => {
  const btnAll = document.getElementById('btn-all');
  const btnOpen = document.getElementById('btn-open');
  const btnClosed = document.getElementById('btn-closed');
  
  const buttons = [btnAll, btnOpen, btnClosed];
  
  buttons.forEach(btn => {
    if (!btn) return;
    if (btn.id === `btn-${activeType}`) {
      btn.className = 'px-8 py-2 rounded-md bg-[#4A00FF] text-white font-medium border border-[#4A00FF] transition-all';
    } else {
      btn.className = 'px-8 py-2 rounded-md bg-white text-gray-600 border border-gray-200 font-medium hover:bg-gray-50 transition-all';
    }
  });
};


const renderTags = (labels) => {
  if (!labels || !Array.isArray(labels)) return '';
  return labels.map(label => {
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
  }).join('');
};