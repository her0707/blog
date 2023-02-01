module.exports = {
  title: `w.h.heo 포스팅 공간`,
  description: `w.h.heo 의 개발노트`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://her0707.github.io`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: '0', // Google Analytics Tracking ID
  author: {
    name: `허원호`,
    bio: {
      role: `프론트엔드 개발자`,
      description: ['적극적으로 나아가는', '편리함을 생각하는'],
      thumbnail: 'sample.png', // Path to the image in the 'asset' folder
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
        date: '2019.04 ~ 2021.08',
        activity: '코코엔터테인먼트코리아 프론트엔드 개발',
      },
      {
        date: '2021.10 ~ ',
        activity: '그린랩스 자재플랫폼 프론트엔드 개발',
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
