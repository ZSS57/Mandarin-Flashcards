// festivalContent.js

const festivalContent = {
    春节: {
      videoSrc: 'https://www.youtube.com/watch?v=2hT56qsraZY',
      description: '春节, also known as Chinese New Year, is one of the most important traditional festivals in China.',
      poem: 
      [
        '《元日》--王安石：',
        '爆竹声中一岁除，春风送暖入屠苏。',
        '千门万户瞳瞳日，总把新桃换旧符。',
      ],
      gamePairs: [
        { word: '红包', meaning: 'Red envelope' },
        { word: '春联', meaning: 'Spring Festival couplets' },
        { word: '年夜饭', meaning: 'New Year’s Eve dinner' },
        { word: '爆竹', meaning: 'Firecrackers' },
        { word: "除夕", meaning: "New Year's Eve" },
        { word: "春节", meaning: "Chinese New Year" },
        { word: "团圆", meaning: "Reunion" },
        { word: "大年初一", meaning: "The first day of the New Year" },
        { word: "吉祥", meaning: "Auspicious, good luck" },
        { word: "祝福", meaning: "Blessing" },
        { word: "拜年", meaning: "New Year’s greetings" }
      ],
    },
      元宵节: {
          videoSrc: "https://www.youtube.com/watch?v=wIGPIpZY-6M",
          description: "元宵节, also known as the Lantern Festival, is a traditional Chinese festival celebrated on the 15th day of the first lunar month.",
          poem: 
          [
            "《元宵节》— 苏轼：",
            "正月十五夜，灯火阑珊处。",
            '---',
            "《上元夜》— 张九龄：",
            "露从今夜白，月是故乡明。",
          ],
          gamePairs: 
          [
            { word: "元宵", meaning: "Sweet dumplings" },
            { word: "灯笼", meaning: "Lantern" },
            { word: "猜灯谜", meaning: "Riddles" },
            { word: "舞龙", meaning: "Dragon dance" },
            { word: "舞狮", meaning: "Lion dance" },
            { word: "灯会", meaning: "Lantern show" },
            { word: "赏灯", meaning: "Watching lanterns" }
          ]
  
      
    },
    中秋节: {
      videoSrc: 'https://www.youtube.com/watch?v=sgDjp-j-K3o',
      description: '中秋节, also known as the Mid-Autumn Festival, is a time for family reunion and moon watching.',
      poem: [
        '《水调歌头》--苏轼：',
        '明月几时有？把酒问青天。',
        '不知天上宫阙，今夕是何年。',
      ],
      gamePairs: [
        { word: '月饼', meaning: 'Mooncake' },
        { word: '团圆', meaning: 'Reunion' },
        { word: '赏月', meaning: 'Moon gazing' },
      ],
    },
    // Add more festivals here as needed
  };
  
  export default festivalContent;
  