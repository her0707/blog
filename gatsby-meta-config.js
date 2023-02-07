module.exports = {
  title: `w.h.heo 포스팅 공간`,
  description: `w.h.heo 의 개발노트`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://her0707.github.io`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `her0707/blog`,
    },
  },
  ga: '0', // Google Analytics Tracking ID
  author: {
    name: `허원호`,
    bio: {
      role: `프론트엔드 개발자`,
      description: ['최적화에 관심이 많은', '더 나은 개선코드를 찾는'],
      thumbnail: '', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/her0707`,
      email: `her2478@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        results: [
          {
            title: '',
            description: '',
            url: '',
          },
        ],
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2021.10 ~ ',
        activity: '그린랩스 자재플랫폼 프론트엔드 개발',
        results: [
          {
            title: '브이하우스 서비스 리뉴얼',
            description:
              '온실 전문설계, 간편견적, 수익성 분석등의 B2B 서비스 제공\n thymeleaf 기반의 기존 프로젝트를 Vue 2.x 버전으로 리뉴얼 진행중인 프로젝트에 참여\n Vuex를 통한 사용자 정보 상태관리, Casl.js 라이브러리를 통해 사용자 역할/권한 제어 구현',
          },
          {
            title: '간편견적 인바운드 서비스 고도화',
            url: 'https://howscost.farmmorning.com/',
            description:
              '온실 설계를 위해 간편하게 견적을 낼 수 있도록 지원하는 서비스 \n 타 개발실에서 진행한 Rescript + Swr 기반 프로젝트를 React + Next + React Query 기반으로 마이그레이션 진행 \n 2주단위 스프린트로 PO, 디자이너와 함께 협업 \n Form 상태는 React Hook Form + Yup 사용',
          },
          {
            title: '브이하우스 조직 가입',
            url: 'https://member.vhows.com/',
            description:
              '기존 브이하우스 서비스에 업체측에서 직접 서비스 가입을 위해 진행한 프로젝트 \n React + Next + React Query 로 개발 ',
          },
          {
            title: '모노레포를 위한 공통 UI 컴포넌트 구현',
            description:
              'turborepo를 사용한 모노레포 공통 UI 컴포넌트를 구현 \n (Input, Radio, Form, checkbox...)',
          },
          {
            title: '모노레포를 위한 공통 UI 컴포넌트 구현',
            url: 'https://www.vhows.com/',
            description:
              '개발실 내 기술스택을 React + Next 기반으로 변경하고자 기존에 Vue로 개발된 서비스를 마이그레이션 진행 \n 일부 핵심영역은 빌드 타임 개선을 위해 Webpack -> Vite로 마이그레이션 \n 사용자 역할/권한, 간편견적, 고객관리, 계약관리 진행',
          },
          {
            title: '시공사/농약사 찾기',
            url: 'https://house.farmmorning.com',
            description:
              '개발 프로젝트 팀 단위로 PO, 디자이너, 개발자 인력이 배치되어 진행 \n 브이하우스 서비스를 통해 관리하는 업체들을 팜모닝 서비스에서 활용할 수 있도록 정보를 제공하는 목적으로 진행한 프로젝트 \n 프론트엔드 일정 및 업무 할당, 개발리드 진행',
          },
          {
            title: '병해충 처방 고도화',
            url: 'https://crop-diagnosis.farmmorning.com/',
            description:
              '농민이 병해충 피해를 입은 작물 이미지를 업로드하여 병해충 정보와 예방을 위한 농약/비료 정보를 제공 \n 타 팀에서 담당하여 진행하는 프로젝트에 내부적인 결정을 통해 좀 더 초점이 맞춰지게 되어 함께 프로젝트를 진행 \n 메인화면 고도화 및 진단 결과 및 상세화면 고도화 작업에 참여',
          },
        ],
      },
      {
        date: '2019.04 ~ 2021.08',
        activity: '코코엔터테인먼트코리아 프론트엔드 개발',
        results: [
          {
            title: 'C2C/B2C 거래소',
            description:
              '암호화폐 C2C 및 B2C 거래를 위한 거래소 서비스 개발(Chart.iq, Vue.js, Vuex)',
          },
          {
            title: 'PG결제 기능',
            description:
              '자사 플랫폼 서비스에서 암호화폐 자산연동을 위한 PG사 기능 프론트 영역 구현(퍼스트몰 결제수단에 추가)',
          },
          {
            title: '바이너리 옵션 차트 라이브러리 변경',
            description:
              '기존에 사용하고 있는 차트 라이브러리에서 데이터 수신 시 발생하는 리소스 과부하와 오류로 인하여 라이브러리 마이그레이션 진행 (ChartIQ로 변경)',
          },
          {
            title: '키오스크 브라우저 Electron 구현',
            description:
              '뱅크 서비스 오프라인 활용을 위한 키오스크 기기에 사용될 디바이스 제어용 Electron 구현 및 페이지 작업',
          },
          {
            title: '뱅크 서비스 신규 상품가입 구현',
            description:
              '코코뱅크 서비스를 위해 사용자가 암호화폐 금융상품을 가입할 수 있도록 페이지 구현',
          },
        ],
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
    ],
  },
};
