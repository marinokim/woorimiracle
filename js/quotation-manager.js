// Quotation History Manager
const quotationManager = (() => {
    const STORAGE_KEY = 'wm_quotations';

    // 견적 상태 정의
    const STATUS = {
        PENDING: 'pending',      // 대기
        REVIEWING: 'reviewing',  // 검토중
        QUOTED: 'quoted',        // 견적완료
        ORDERED: 'ordered',      // 발주완료
        CANCELLED: 'cancelled'   // 취소됨
    };

    // 상태별 한글 라벨
    const STATUS_LABELS = {
        'pending': '대기',
        'reviewing': '검토중',
        'quoted': '견적완료',
        'ordered': '발주완료',
        'cancelled': '취소됨'
    };

    // 상태별 색상
    const STATUS_COLORS = {
        'pending': '#FFA726',    // 주황
        'reviewing': '#42A5F5',  // 파랑
        'quoted': '#66BB6A',     // 초록
        'ordered': '#9C27B0',    // 보라
        'cancelled': '#EF5350'   // 빨강
    };

    // 모든 견적 가져오기
    const getAll = () => {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    };

    // 견적 저장
    const save = (quotations) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(quotations));
    };

    // 새 견적 추가
    const add = (quotationData) => {
        const quotations = getAll();
        const user = userAuth.getCurrentUser();

        const newQuotation = {
            id: 'Q' + Date.now(),
            userId: user ? user.id : 'guest',
            userName: user ? user.name : quotationData.userName || '비회원',
            userCompany: quotationData.userCompany || '',
            userEmail: user ? user.email : quotationData.userEmail || '',
            userPhone: quotationData.userPhone || '',
            date: new Date().toLocaleDateString('ko-KR'),
            datetime: new Date().toISOString(),
            items: quotationData.items || [],
            totalAmount: quotationData.totalAmount || 0,
            status: STATUS.PENDING,
            customerNote: quotationData.customerNote || '',
            adminNote: '',
            createdAt: Date.now()
        };

        quotations.push(newQuotation);
        save(quotations);
        return newQuotation;
    };

    // 사용자별 견적 가져오기
    const getByUser = (userId) => {
        const quotations = getAll();
        return quotations.filter(q => q.userId === userId)
            .sort((a, b) => b.createdAt - a.createdAt);
    };

    // ID로 견적 가져오기
    const getById = (id) => {
        const quotations = getAll();
        return quotations.find(q => q.id === id);
    };

    // 견적 업데이트
    const update = (id, updates) => {
        const quotations = getAll();
        const index = quotations.findIndex(q => q.id === id);

        if (index !== -1) {
            quotations[index] = { ...quotations[index], ...updates };
            save(quotations);
            return quotations[index];
        }
        return null;
    };

    // 상태 업데이트
    const updateStatus = (id, status, adminNote = '') => {
        return update(id, { status, adminNote });
    };

    // 견적 삭제
    const remove = (id) => {
        const quotations = getAll();
        const filtered = quotations.filter(q => q.id !== id);
        save(filtered);
    };

    // 상태별 견적 가져오기
    const getByStatus = (status) => {
        const quotations = getAll();
        return quotations.filter(q => q.status === status)
            .sort((a, b) => b.createdAt - a.createdAt);
    };

    // 업체명으로 검색
    const searchByCompany = (companyName) => {
        const quotations = getAll();
        return quotations.filter(q =>
            q.userCompany.toLowerCase().includes(companyName.toLowerCase())
        ).sort((a, b) => b.createdAt - a.createdAt);
    };

    // 통계 가져오기
    const getStats = () => {
        const quotations = getAll();
        const thisMonth = new Date().getMonth();
        const thisYear = new Date().getFullYear();

        return {
            total: quotations.length,
            pending: quotations.filter(q => q.status === STATUS.PENDING).length,
            reviewing: quotations.filter(q => q.status === STATUS.REVIEWING).length,
            quoted: quotations.filter(q => q.status === STATUS.QUOTED).length,
            ordered: quotations.filter(q => q.status === STATUS.ORDERED).length,
            thisMonth: quotations.filter(q => {
                const date = new Date(q.datetime);
                return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
            }).length
        };
    };

    return {
        STATUS,
        STATUS_LABELS,
        STATUS_COLORS,
        add,
        getAll,
        getByUser,
        getById,
        update,
        updateStatus,
        remove,
        getByStatus,
        searchByCompany,
        getStats
    };
})();
