if(!self.define){let e,a={};const c=(c,s)=>(c=new URL(c+".js",s).href,a[c]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=a,document.head.appendChild(e)}else e=c,importScripts(c),a()})).then((()=>{let e=a[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(s,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(a[t])return;let n={};const d=e=>c(e,t),f={module:{uri:t},exports:n,require:d};a[t]=Promise.all(s.map((e=>f[e]||d(e)))).then((e=>(i(...e),n)))}}define(["./workbox-495fd258"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"179e44f051627bf692a038342f23b296"},{url:"/_next/static/chunks/079e1baa-e24aec409db0885c.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/079e1baa-e24aec409db0885c.js.map",revision:"3cde755ea46b816729e1f21554b3ae91"},{url:"/_next/static/chunks/1028.2075512b9ab1f8d6.js",revision:"2075512b9ab1f8d6"},{url:"/_next/static/chunks/1028.2075512b9ab1f8d6.js.map",revision:"37d3bac58f68225528d51aa087ded1f9"},{url:"/_next/static/chunks/1174.f9a6e9a7e37f02a0.js",revision:"f9a6e9a7e37f02a0"},{url:"/_next/static/chunks/1174.f9a6e9a7e37f02a0.js.map",revision:"4e8a2f96eb03de9f1c78db7dfe24bf9e"},{url:"/_next/static/chunks/11a0f8c4-2f7a3be3fce0bef8.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/18166cba-55b5a516e11d13c6.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/1883.95f827e6dd286eb5.js",revision:"95f827e6dd286eb5"},{url:"/_next/static/chunks/1883.95f827e6dd286eb5.js.map",revision:"f5cfccb0c3ec7903f3a1bc5e72447ce1"},{url:"/_next/static/chunks/1dd3208c-9e8c900988b293de.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/1dd3208c-9e8c900988b293de.js.map",revision:"37cff91afbc315fc995b1302938bfe1a"},{url:"/_next/static/chunks/2491.2f18bc8fa50150e5.js",revision:"2f18bc8fa50150e5"},{url:"/_next/static/chunks/2491.2f18bc8fa50150e5.js.map",revision:"cc13f1bd733961961977c2e24bef803b"},{url:"/_next/static/chunks/2500.3994353a6c7c2291.js",revision:"3994353a6c7c2291"},{url:"/_next/static/chunks/2500.3994353a6c7c2291.js.map",revision:"09e6148c0fa8dbf8903bc3ea09bc1e45"},{url:"/_next/static/chunks/257.5ec704036b4eb171.js",revision:"5ec704036b4eb171"},{url:"/_next/static/chunks/257.5ec704036b4eb171.js.map",revision:"3a98591d62f8e062cbbd7afea93ce91d"},{url:"/_next/static/chunks/263c7a83.b1400c959d3b5e7a.js",revision:"b1400c959d3b5e7a"},{url:"/_next/static/chunks/263c7a83.b1400c959d3b5e7a.js.map",revision:"e15784d85e18bb0f7e53e6d0e90d9b4b"},{url:"/_next/static/chunks/2663.1cdd4b063bedbec2.js",revision:"1cdd4b063bedbec2"},{url:"/_next/static/chunks/2663.1cdd4b063bedbec2.js.map",revision:"5d578255f0d4e8f62c9569759067f598"},{url:"/_next/static/chunks/2849.6d7b62236a63890f.js",revision:"6d7b62236a63890f"},{url:"/_next/static/chunks/2849.6d7b62236a63890f.js.map",revision:"1faada79b92ca4a6384ee33633443aa2"},{url:"/_next/static/chunks/2889-59e08d9be2602d58.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/2889-59e08d9be2602d58.js.map",revision:"a64759a98c6fef3f6fd80994e4c9b6f8"},{url:"/_next/static/chunks/3196.b32dd4ca6c649077.js",revision:"b32dd4ca6c649077"},{url:"/_next/static/chunks/387-e4231303c7f58283.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/387-e4231303c7f58283.js.map",revision:"5ed1b7ea13f3186502b1103e1edd5ebb"},{url:"/_next/static/chunks/3fec4828-98f6d0a833202025.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/3fec4828-98f6d0a833202025.js.map",revision:"7aaa0e75de69c39fcbe93073017afc5f"},{url:"/_next/static/chunks/4022.f1b7753a8c7b6ad5.js",revision:"f1b7753a8c7b6ad5"},{url:"/_next/static/chunks/4154-9e48204df06e535f.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/4154-9e48204df06e535f.js.map",revision:"0c341f9397963d4e8414e6669c8b0735"},{url:"/_next/static/chunks/421.2e073f5997313d64.js",revision:"2e073f5997313d64"},{url:"/_next/static/chunks/421.2e073f5997313d64.js.map",revision:"f02fb80f631b9563fb314a780983c9ce"},{url:"/_next/static/chunks/4946.91308a568dafdd36.js",revision:"91308a568dafdd36"},{url:"/_next/static/chunks/4946.91308a568dafdd36.js.map",revision:"dac987a1ecc69caaa5f9475b97e835bd"},{url:"/_next/static/chunks/5004-8bb774bdbcfbac64.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/5004-8bb774bdbcfbac64.js.map",revision:"ef5fb983a631e76031347784b9b9d23e"},{url:"/_next/static/chunks/558.3c92a862d7ec0041.js",revision:"3c92a862d7ec0041"},{url:"/_next/static/chunks/558.3c92a862d7ec0041.js.map",revision:"44e36f9eae4eeb62cb8b08ad1bca727d"},{url:"/_next/static/chunks/5661.431f7731113b228e.js",revision:"431f7731113b228e"},{url:"/_next/static/chunks/5661.431f7731113b228e.js.map",revision:"a68c4d9d8c19dcc2d5d40c13481cd818"},{url:"/_next/static/chunks/5880.7ab8a28b1dee6e02.js",revision:"7ab8a28b1dee6e02"},{url:"/_next/static/chunks/5880.7ab8a28b1dee6e02.js.map",revision:"8efc4acb0dfced87f958f5da425e48bc"},{url:"/_next/static/chunks/6385-97a035369ef2dabc.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/6385-97a035369ef2dabc.js.map",revision:"3f4569f64133d42f44b0741d5436c58d"},{url:"/_next/static/chunks/6450.6e2c9d012f5728d5.js",revision:"6e2c9d012f5728d5"},{url:"/_next/static/chunks/6450.6e2c9d012f5728d5.js.map",revision:"328342838af6964022f2231c180a6a9b"},{url:"/_next/static/chunks/6685.39d6b28cd91fe6e8.js",revision:"39d6b28cd91fe6e8"},{url:"/_next/static/chunks/6685.39d6b28cd91fe6e8.js.map",revision:"48cecd0c2936a42f25e6c0d91188be6a"},{url:"/_next/static/chunks/6754.ea1cfef32f4a6241.js",revision:"ea1cfef32f4a6241"},{url:"/_next/static/chunks/6754.ea1cfef32f4a6241.js.map",revision:"22d9ee1ae8dea6865cb029e4761403f6"},{url:"/_next/static/chunks/6799.55915ae03482decd.js",revision:"55915ae03482decd"},{url:"/_next/static/chunks/6799.55915ae03482decd.js.map",revision:"18a78c77588b678744a590d782362b29"},{url:"/_next/static/chunks/7430-362334de7a783267.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/7430-362334de7a783267.js.map",revision:"852dfd9b530c6ffc36d45421b9e369e9"},{url:"/_next/static/chunks/7659.77672bb730a8c620.js",revision:"77672bb730a8c620"},{url:"/_next/static/chunks/7659.77672bb730a8c620.js.map",revision:"79ffee287b115a17e57fc33e6766bc32"},{url:"/_next/static/chunks/7bf36345-a152aac95b0c3d89.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/7bf36345-a152aac95b0c3d89.js.map",revision:"9dd7809bfc6417898bb7871753b966c4"},{url:"/_next/static/chunks/8758.6ff90cde53935264.js",revision:"6ff90cde53935264"},{url:"/_next/static/chunks/8758.6ff90cde53935264.js.map",revision:"1e8431f8127ab1a3c321361a38da4e31"},{url:"/_next/static/chunks/891cff7f.a84762cdcc800b92.js",revision:"a84762cdcc800b92"},{url:"/_next/static/chunks/891cff7f.a84762cdcc800b92.js.map",revision:"b38ebfd1eabb1d2f797bc702fe00c3fc"},{url:"/_next/static/chunks/8993.a13d1449e34158bf.js",revision:"a13d1449e34158bf"},{url:"/_next/static/chunks/8993.a13d1449e34158bf.js.map",revision:"6e35b23ad1c87c3e0fb422ef697b7720"},{url:"/_next/static/chunks/8bb4d8db.40550724196f7073.js",revision:"40550724196f7073"},{url:"/_next/static/chunks/8bb4d8db.40550724196f7073.js.map",revision:"ac809a2a8fddafdf432ec91c6b1fe887"},{url:"/_next/static/chunks/9605.92d6d632f0d5addc.js",revision:"92d6d632f0d5addc"},{url:"/_next/static/chunks/9605.92d6d632f0d5addc.js.map",revision:"365cd1857d446c8974fe1e316dee0fa0"},{url:"/_next/static/chunks/9679.c75ca6c8eaa9bbbb.js",revision:"c75ca6c8eaa9bbbb"},{url:"/_next/static/chunks/968.60587d2211cdf2ce.js",revision:"60587d2211cdf2ce"},{url:"/_next/static/chunks/968.60587d2211cdf2ce.js.map",revision:"166c594c31cd7cebb7b7454d0628218a"},{url:"/_next/static/chunks/9deec748-167f43980d03a899.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/9deec748-167f43980d03a899.js.map",revision:"2c508f6868ed59cd841c4c719794179a"},{url:"/_next/static/chunks/app/_not-found/page-d38dd53fd1dbd765.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/_not-found/page-d38dd53fd1dbd765.js.map",revision:"b45167947b4209ca000abdda22170f4d"},{url:"/_next/static/chunks/app/accessDenied/page-264caa7e984ac7c6.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/accessDenied/page-264caa7e984ac7c6.js.map",revision:"7735cf3078e50417ac3698849a93c186"},{url:"/_next/static/chunks/app/balances/page-a38f73092718d514.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/balances/page-a38f73092718d514.js.map",revision:"24581299c1fd48c86321a204e168f526"},{url:"/_next/static/chunks/app/cexOnRamp/page-e2617c5b83565e8f.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/cexOnRamp/page-e2617c5b83565e8f.js.map",revision:"b7c0688f1d07df18238ec66225a489e9"},{url:"/_next/static/chunks/app/direct/page-5d8b6c6b9f46bf12.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/direct/page-5d8b6c6b9f46bf12.js.map",revision:"982c50ec4e3ff635f97ce30b3f89a249"},{url:"/_next/static/chunks/app/error-22f8229b1dc12774.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/error-22f8229b1dc12774.js.map",revision:"e00b6c212fa4cb7c2847ffdede8abb71"},{url:"/_next/static/chunks/app/global-error-6c43e93f4dc56076.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/global-error-6c43e93f4dc56076.js.map",revision:"2a651198090eb65758d93b0b25bd5d0e"},{url:"/_next/static/chunks/app/history/page-0916689629665827.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/history/page-0916689629665827.js.map",revision:"663d126dccfc4ef21a9e08e77909c7ff"},{url:"/_next/static/chunks/app/layout-e4bbeedefc5b4c8b.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/layout-e4bbeedefc5b4c8b.js.map",revision:"cb3eb4bb4be91da12573cf119a8fd3da"},{url:"/_next/static/chunks/app/maintenance/page-7ebae75f7790686e.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/maintenance/page-7ebae75f7790686e.js.map",revision:"a32cc9bbdf143f3b9c5b5e8650fc611f"},{url:"/_next/static/chunks/app/page-8ad67c6de250197c.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/page-8ad67c6de250197c.js.map",revision:"e348800ca4b38d8e3febe57c8d149a7a"},{url:"/_next/static/chunks/app/rewards/%5Bid%5D/page-2e21c65220ae6bcb.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/rewards/%5Bid%5D/page-2e21c65220ae6bcb.js.map",revision:"35f6e1efc71e5eaf481e565d9f8037c7"},{url:"/_next/static/chunks/app/rewards/info/page-3e3fa8f3842b1120.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/rewards/info/page-3e3fa8f3842b1120.js.map",revision:"b002b2238381ee632920ad471fcca574"},{url:"/_next/static/chunks/app/rewards/page-01a611cdbac8e09c.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/rewards/page-01a611cdbac8e09c.js.map",revision:"79378c53435899dbd49e3139c82be05e"},{url:"/_next/static/chunks/app/thea/layout-7bd3c893b5f1e89c.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/thea/layout-7bd3c893b5f1e89c.js.map",revision:"b01e9a3047647fd6bf802c5be9f38924"},{url:"/_next/static/chunks/app/thea/page-0a0fb553b97ce14b.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/thea/page-0a0fb553b97ce14b.js.map",revision:"a103b6eb03fbbebf84d56bfe7c70227e"},{url:"/_next/static/chunks/app/trading/%5Bid%5D/page-121b3300bb9851ac.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/trading/%5Bid%5D/page-121b3300bb9851ac.js.map",revision:"d4b83a7ade80deef8dbc810d1064ecb6"},{url:"/_next/static/chunks/app/trading/page-568d0883a023cbcb.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/transfer/%5Bid%5D/page-33ff2c0c70afbe26.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/transfer/%5Bid%5D/page-33ff2c0c70afbe26.js.map",revision:"c84da53f59fbe47132163507a4bfeebb"},{url:"/_next/static/chunks/app/transfer/layout-700faadec22c1c50.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/app/transfer/layout-700faadec22c1c50.js.map",revision:"82b9204428d39a5ec361633721d64f00"},{url:"/_next/static/chunks/app/transfer/page-b9a746df4641dc25.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/bca37a97-5ce91be832682d4a.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/bca37a97-5ce91be832682d4a.js.map",revision:"d48ce8a0a91b2105c87a4bb3dd9948ac"},{url:"/_next/static/chunks/dd716029-f1471754b04f5aa5.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/dd716029-f1471754b04f5aa5.js.map",revision:"5c36ff278e2f041c19cef2f060ce5f26"},{url:"/_next/static/chunks/f7d80776-4c723ec4dc7674c7.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/f7d80776-4c723ec4dc7674c7.js.map",revision:"a760626c30fa188c51c6da01f9ca113b"},{url:"/_next/static/chunks/ffb4db90.bf643cb3567ced2a.js",revision:"bf643cb3567ced2a"},{url:"/_next/static/chunks/framework-47e72bcf2de9ca68.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/framework-47e72bcf2de9ca68.js.map",revision:"efd054a8aeaa404b2066364f876ddb92"},{url:"/_next/static/chunks/main-0c05f97b421ea01f.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/main-0c05f97b421ea01f.js.map",revision:"936c6da0240a92d54799a16bd366cffe"},{url:"/_next/static/chunks/main-app-ebd5e5e7be939fb7.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/main-app-ebd5e5e7be939fb7.js.map",revision:"bcce252b1dd4efe60ccfa9df069e7223"},{url:"/_next/static/chunks/pages/_app-f03af1fc5e524f1f.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/pages/_app-f03af1fc5e524f1f.js.map",revision:"48262cabdf2f0cdef9baf9b261d14edf"},{url:"/_next/static/chunks/pages/_error-b43021fcf80fd84b.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/pages/_error-b43021fcf80fd84b.js.map",revision:"2029ecfdd2a771b18276820c4fffebeb"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-c41fee8370d4ccbf.js",revision:"orderbookDefaultId"},{url:"/_next/static/chunks/webpack-c41fee8370d4ccbf.js.map",revision:"69c684c6e92a10e1d282dffef119b6bd"},{url:"/_next/static/css/2ce43fa34e6d6994.css",revision:"2ce43fa34e6d6994"},{url:"/_next/static/css/2ce43fa34e6d6994.css.map",revision:"8324a361a48f6ef6d6e6112a70beb2cf"},{url:"/_next/static/css/98226d1b883d6420.css",revision:"98226d1b883d6420"},{url:"/_next/static/css/98226d1b883d6420.css.map",revision:"065f1f5fbacea2da26c28ad07f9f7705"},{url:"/_next/static/css/f571563d45f40b87.css",revision:"f571563d45f40b87"},{url:"/_next/static/css/f571563d45f40b87.css.map",revision:"931835a90a611d08a1db9209c3d9a2b1"},{url:"/_next/static/media/02edef4d0edfad6d-s.p.woff2",revision:"7a1a8ba6e24fecc400574e8ffe354665"},{url:"/_next/static/media/045832894acda0e9-s.p.woff2",revision:"200c41f352c466e1c2b117656a0256e8"},{url:"/_next/static/media/0881a2b922b3331e-s.woff2",revision:"a0891d7e3512851a00017bc6aa93a49a"},{url:"/_next/static/media/0e5e1c6a8db9e432-s.woff2",revision:"f201ef2b6f1307dd8b1ec0c0deffceea"},{url:"/_next/static/media/120a5a1920781bd0-s.p.woff2",revision:"8c4b05d4371467ba1d0bc60839c6dcb9"},{url:"/_next/static/media/27971e35634b7c88-s.woff2",revision:"4264bad61333859477947703b15aadfd"},{url:"/_next/static/media/279b47070a5d5877-s.woff2",revision:"f604c827dc8754b14422f431013955eb"},{url:"/_next/static/media/28aa5118b38b86e4-s.woff2",revision:"db5317b009a0dedd66dab31d7889b5f3"},{url:"/_next/static/media/2f66f084fba01545-s.woff2",revision:"8e0642a7dd6dfe9491afa20e4a470655"},{url:"/_next/static/media/31a961c285846cb0-s.woff2",revision:"dec886e2a77a7e9a04c098f19e20e1ee"},{url:"/_next/static/media/483de911b1a0d258-s.woff2",revision:"28502b06e67112e0bf77a784aee917d0"},{url:"/_next/static/media/550cf1913d99b09c-s.woff2",revision:"9520edb06f693095fd0d7d6475bb8232"},{url:"/_next/static/media/5693677ef07d9b51-s.woff2",revision:"96b57d1ae0a86dcf7913589b27426343"},{url:"/_next/static/media/5721dfda5b43cc5f-s.woff2",revision:"add475a744fab261f16437dcb27ff195"},{url:"/_next/static/media/674abd25bb7be96f-s.woff2",revision:"92e5e17ec75636ec7ab5c46a00a54342"},{url:"/_next/static/media/6ebb97b5c9fa4e03-s.p.woff2",revision:"39aff03d2a35b1c80f210051f35d4b2b"},{url:"/_next/static/media/7a7012758df5a81e-s.woff2",revision:"26024640d95a44fd98f614d6f4372e4b"},{url:"/_next/static/media/7c16c8204ab29534-s.woff2",revision:"eac32b711872911e7e7c107eb7a7901a"},{url:"/_next/static/media/7d1684f14ddac155-s.woff2",revision:"604411f91e27fd9740f3c4482aef4d58"},{url:"/_next/static/media/7f9c2bb12d05b4c1-s.woff2",revision:"d11830f32f3b43ac4e4116cc6904a152"},{url:"/_next/static/media/80b1a0e600ca6d83-s.woff2",revision:"584ea11fad4f10a879c8530e7575cbbf"},{url:"/_next/static/media/82233a533941ac93-s.woff2",revision:"ac7d441c7fe6e91a0dce7510d3b3d38e"},{url:"/_next/static/media/8720059dfa14a1fe-s.woff2",revision:"1254e937b1635a843bc7bdee51de2aeb"},{url:"/_next/static/media/879d1750a4bfabb3-s.woff2",revision:"21523ab5c4c29459e1b67f30022aaaaf"},{url:"/_next/static/media/8c3de32e92410013-s.woff2",revision:"1029e564ae93e7ce4f3feaa6598daa8a"},{url:"/_next/static/media/906678b269849541-s.woff2",revision:"21c838ead8641ef57bc94d27efcd257e"},{url:"/_next/static/media/98a28a5430a3cf7f-s.woff2",revision:"7dada9344a370f25dc1d3b7030da67b6"},{url:"/_next/static/media/994bf73bb06543dc-s.woff2",revision:"0ed4fab7b6a3e3c06f70de37b3eb5f47"},{url:"/_next/static/media/9d97415e38cab482-s.woff2",revision:"7f62fad6ca9505fd98371aa39273f8b1"},{url:"/_next/static/media/ac0efabfe978b0ad-s.woff2",revision:"ed31e4b8cd1d209be2e50af162f26e00"},{url:"/_next/static/media/accessDenied.ea636eee.webp",revision:"3b5e518f220ce2a3862b05019cd94f8d"},{url:"/_next/static/media/boy.ca23e0bb.webp",revision:"20a2fab54e3434a1b72700a805b6e6da"},{url:"/_next/static/media/c714540e49ad5111-s.p.woff2",revision:"f8ecacbffc9878e584aa180d11d676bd"},{url:"/_next/static/media/cd31bf4b34f8dfb3-s.woff2",revision:"1a0c60b7297c849ea95c06380a4c0961"},{url:"/_next/static/media/d602976d04712c39-s.woff2",revision:"2ec2275671ea10b81edb48488dbcf1b2"},{url:"/_next/static/media/d67e8433214df714-s.woff2",revision:"0cc84b2ade79f1fcfe2f0b694c51bea1"},{url:"/_next/static/media/da897b99eb1fe4a1-s.p.woff2",revision:"4903a00d1c555c0846799302c673d6a1"},{url:"/_next/static/media/df2942b6de9d14b5-s.woff2",revision:"47e8ccc33b3dcfbe6d31914569515bf4"},{url:"/_next/static/media/e1d0f983e2a3e4f5-s.woff2",revision:"9886c3f65b99ad2575a04a726cd0157b"},{url:"/_next/static/media/e22508e41752d816-s.woff2",revision:"73749e5f35230a9dd88b489e914fd4cd"},{url:"/_next/static/media/ecf49d904668b268-s.woff2",revision:"9f2ae2ca944b5bd6c3d59b01f78ec5ff"},{url:"/_next/static/media/ed37791012a28541-s.woff2",revision:"3b2d3bfbb80e64ae4ed37c15667e1736"},{url:"/_next/static/media/f1df6186c8d69644-s.woff2",revision:"307c90aaa7d9c628155ee8cb913b8382"},{url:"/_next/static/media/f756da832d8c34d4-s.woff2",revision:"ef6b28a1181a73b788c8669d6ad9adc8"},{url:"/_next/static/media/lock.6adae954.webp",revision:"6ad0f40963ed5df256051ea59bf09850"},{url:"/_next/static/media/maintenance.3658a75f.webp",revision:"1e73cd91b58156d64944bcce52bd1e68"},{url:"/_next/static/media/obHestia.c7873888.webp",revision:"2d6e43d1d71049ea814ac2b88b30bfa8"},{url:"/_next/static/media/speed_new_2.87aff0f1.webp",revision:"1a999b597bb206e19cea5cdace3f9970"},{url:"/_next/static/media/suite.a41a3886.webp",revision:"5194cb77786718d449073504eebf3129"},{url:"/_next/static/orderbookDefaultId/_buildManifest.js",revision:"bbe5400b7a0db2bc3bf6358cc4826072"},{url:"/_next/static/orderbookDefaultId/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/icon-192x192.png",revision:"a5a565cdc5faf311764241999f715615"},{url:"/icon-256x256.png",revision:"a5a565cdc5faf311764241999f715615"},{url:"/icon-384x384.png",revision:"a5a565cdc5faf311764241999f715615"},{url:"/icon-512x512.png",revision:"a5a565cdc5faf311764241999f715615"},{url:"/img/aboutWalletsSlide1.svg",revision:"7ccfa3a4990288593545bb85b19f173a"},{url:"/img/aboutWalletsSlide2.svg",revision:"a73298146ec907d5b924b65a2fafa9a2"},{url:"/img/accessDenied.webp",revision:"3b5e518f220ce2a3862b05019cd94f8d"},{url:"/img/analysys_switchdex.jpg",revision:"0f418047cb8605d8c2b07b7e7b06fe45"},{url:"/img/boy.webp",revision:"20a2fab54e3434a1b72700a805b6e6da"},{url:"/img/btc.png",revision:"0aa41085477aa01b58dcc76d246e16f1"},{url:"/img/dark_switchdex_logo.jpg",revision:"8ed0d9f2d3b860632b6191db6058a254"},{url:"/img/emptyWallet.svg",revision:"0155481ba12ceffc74e17383d5f7c9b8"},{url:"/img/eth.png",revision:"f552dde33c26b3143caab3fb588ff916"},{url:"/img/introHero.webp",revision:"9d24073a87fcbd7ef43591a78998328c"},{url:"/img/light_switchdex_logo.jpg",revision:"692c8598d72ee068eae782184a4a829f"},{url:"/img/lock.webp",revision:"6ad0f40963ed5df256051ea59bf09850"},{url:"/img/maintenance.webp",revision:"1e73cd91b58156d64944bcce52bd1e68"},{url:"/img/market.webp",revision:"a775aa694258033ec8cc87dffe8f30ae"},{url:"/img/myid.png",revision:"6a8d154b4e98cf76390633ffffcbc030"},{url:"/img/nonCustodial.webp",revision:"06f79627e4d3a46f2905b4f02e8c232e"},{url:"/img/obHestia.webp",revision:"2d6e43d1d71049ea814ac2b88b30bfa8"},{url:"/img/orderbook.webp",revision:"d51c012e45e5c55c58bb73e9f5147a99"},{url:"/img/padlock.webp",revision:"2c782dee57683467592afd14b384de29"},{url:"/img/permissionIssue.svg",revision:"2bf97b91a010e1238df24efd3abdf9ba"},{url:"/img/qrCode.png",revision:"68e632f87b2c9b00e9c47c4533fb87cb"},{url:"/img/speed.webp",revision:"a5eb0b9395810f55a42ecae4922219f1"},{url:"/img/speed_new.webp",revision:"937f65e16c5f83e9fccebef2b1d05639"},{url:"/img/speed_new_2.webp",revision:"1a999b597bb206e19cea5cdace3f9970"},{url:"/img/suite.webp",revision:"5194cb77786718d449073504eebf3129"},{url:"/img/swapHero.webp",revision:"90a71ca2fe446917e7046dfcd46717f5"},{url:"/img/trading_home.png",revision:"77bb46ac92dff5a40caa829e550ed5aa"},{url:"/img/unregister.svg",revision:"2d4de62e7fa8a6b77f3521cc34d48925"},{url:"/manifest.json",revision:"1e4e46ab8aab95c342b7959e7a761930"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/static/style.css",revision:"fe71b8017c4da53d3e061efa0e4d512c"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:c,state:s})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
//# sourceMappingURL=sw.js.map
