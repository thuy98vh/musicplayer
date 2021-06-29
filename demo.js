
const $  = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document); 
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')

const app = {
  currentIndex : 0,
  isPlaying : false,
  isRandom : false,
  isRepeat : false,

  songs: [
    {
      name: 'Monsters',
      singer: 'Katie Sky',
      path: './assets/mp3/song1.mp3',
      image: './assets/img/monster.jpg',
    },
    {
      name: 'Because You Live',
      singer: 'Jesse McCartney',
      path: './assets/mp3/Because You Live.mp3',
      image: './assets/img/because_u_live.jpg',
    },
    {
      name: 'Nothing s Gonna Change My Love For You',
      singer: 'George Benson',
      path: './assets/mp3/Nothing s Gonna Change My Love.mp3',
      image: './assets/img/nothings-gonna-change-my-love-for-you.jpg',
    },
    {
      name: 'Until You',
      singer: 'Shayne Ward',
      path: './assets/mp3/Until You.mp3',
      image: './assets/img/until_you.jpg',
    },
    {
      name: 'Only Love',
      singer: 'Ed Sheeran',
      path: './assets/mp3/Only Love.mp3',
      image: './assets/img/only_love.jpg',
    }
    ,
    {
      name: 'Beautiful In White',
      singer: 'Shane Filan',
      path: './assets/mp3/Beautiful In White.mp3',
      image: './assets/img/beautiful_in_white.PNG',
    },
    {
      name: 'Lạ Lùng',
      singer: 'Vũ',
      path: './assets/mp3/LẠ LÙNG.mp3',
      image: './assets/img/la_lung.jpg',
    },
    {
      name: 'Họ Yêu Ai Mất Rồi',
      singer: 'Doãn Hiếu',
      path: './assets/mp3/Họ Yêu Ai Mất Rồi.mp3',
      image: './assets/img/ho_yeu_ai_mat_roi.jpg',
    },
    {
      name: 'Chỉ Là Không Cùng Nhau',
      singer: 'Tăng Phúc ft Trương Thảo Nhi',
      path: './assets/mp3/CHỈ LÀ KHÔNG CÙNG NHAU.mp3',
      image: './assets/img/chi_la_khong_cung_nhau.jpg',
    },
    {
      name: 'Chỉ Bằng Cái Gật Đầu',
      singer: 'Yan Nguyễn',
      path: './assets/mp3/Chỉ Bằng Cái Gật Đầu.mp3',
      image: './assets/img/chi_bang_cai_gat_dau.jpg',
    },
    {
      name: 'Sài Gòn Hôm Nay Mưa',
      singer: 'JSON & Hoàng Duyên',
      path: './assets/mp3/Sài Gòn Hôm Nay Mưa.mp3',
      image: './assets/img/sai_gon_hom_nay_mua.jpg',
    },
    {
      name: 'Sparkle',
      singer: 'Your Name AMV',
      path: './assets/mp3/Sparkle.mp3',
      image: './assets/img/your_name.jpg',
    },
    {
      name: 'Weathering With You OST',
      singer: 'RADWIMPS',
      path: './assets/mp3/Weathering With You OST.mp3',
      image: './assets/img/ten_ki_noko_t.jpg',
    },
    {
      name: 'Grand Escape',
      singer: 'RADWIMPS',
      path: './assets/mp3/Grand Escape.mp3',
      image: './assets/img/ten_ki_noko_e.jpg',
    },
    {
      name: 'Shout Baby',
      singer: 'My Hero Academia Ed',
      path: './assets/mp3/My Hero Academia Season 4.mp3',
      image: './assets/img/boku_no_hero.jpg',
    },
    {
      name: 'Wanna Go Home',
      singer: 'Konosuba Ed',
      path: './assets/mp3/Kono Subarashii Sekai ni Shukufuku wo! 2.mp3',
      image: './assets/img/kosuba.jpg',
    },
  ],
  render: function() {
    const htmls = this.songs.map((song, index) => {
      return `
          <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
              <div class="thumb" style="background-image : url('${song.image}')"></div>
              <div class="body">
                  <h3 class="title">${song.name}</h3>
                  <p class="author">${song.singer}</p>
              </div>
              <div class="option">
                  <i class="fas fa-ellipsis-h"></i>
              </div>
          </div>
      `
    });
    playList.innerHTML = htmls.join('')

  },

  defineProperties: function(){
    Object.defineProperty(this, 'currentSong', {
      get: function() {
        return this.songs[this.currentIndex]
      }
    })
  },

  handleEvents: function() {
    // Xử lí kéo lên xuống thanh cuộn
    const cdWidth = cd.offsetWidth
    document.onscroll = function() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const newCdWidth = cdWidth - scrollTop
      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
      cd.style.opacity = newCdWidth / cdWidth
    }

    // Xử lí việc quay cd
    const cdThumbAnimate = cdThumb.animate(
      [{transform : 'rotate(360deg)'}],
      {
        duration: 10000,
        iterations: Infinity
      }
    )
    cdThumbAnimate.pause()

    // Xử lí kích vào nút play 
    playBtn.onclick = function(){
      if(app.isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
    }
    // Khi song pause
    audio.onpause = function(){
      app.isPlaying = false
      player.classList.remove('playing')
      cdThumbAnimate.pause()
    }
    // Khi song play
    audio.onplay = function(){
      app.isPlaying = true
      player.classList.add('playing')
      cdThumbAnimate.play()
    }
    // Khi song đang chạy 
    audio.ontimeupdate = function(){
      if(audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration *100)
        progress.value = progressPercent
      }
    }
    // khi tua song
    progress.oninput = function(){
      const seekTime = (audio.duration / 100 * progress.value)
      audio.currentTime = seekTime
      audio.play()
    }
    // Khi Next Song
    nextBtn.onclick = function(){
      if(app.isRandom === true){
        app.randomSong()
      }
      app.nextSong()
      audio.play()
    }
    // Khi Prev Song
    prevBtn.onclick = function(){
      if(app.isRandom === true) {
        app.randomSong()
      }
      app.prevSong()
      audio.play()
    }
    // Khi Random Song
    randomBtn.onclick = function(){
      if(app.isRandom) {
        randomBtn.classList.remove('active')
        app.isRandom = false
      } else {
        randomBtn.classList.add('active')
        app.isRandom = true
        app.randomSong()
      }
    }
    // Khi End Song 
    audio.onended = function(){
      if(app.isRepeat === true){
        audio.play()
      } else {
        nextBtn.click()
      }
    }
    // Khi Repeat Song
    repeatBtn.onclick = function(){
      if(app.isRepeat) {
        repeatBtn.classList.remove('active')
        app.isRepeat = false
      } else {
        repeatBtn.classList.add('active')
        app.isRepeat = true
      }
    }
    // Khi click vào Song
    playList.onclick = function(e){
      const songNode = e.target.closest('.song:not(.active)')
      if(songNode || e.target.closest('.option')) {
        if(songNode) {
          app.currentIndex = Number(songNode.dataset.index)
          app.loadCurrentSong()
          app.render()
          audio.play()
        }
        if(e.target.closest('.option')) {

        }
      }
    }
  },
  
  loadCurrentSong: function(){
    heading.textContent = this.currentSong.name
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
    audio.src = this.currentSong.path
  },

  nextSong: function(){
    app.currentIndex++
      if(app.currentIndex >= app.songs.length) {
        app.currentIndex = 0
      }
      app.loadCurrentSong()
      this.render()
      this.scrollToActiveSong()
  },

  prevSong: function(){
    app.currentIndex--
      if(app.currentIndex < 0) {
        app.currentIndex = app.songs.length - 1
      }
      app.loadCurrentSong()
      this.render()
      this.scrollToActiveSong()
  },

  randomSong: function(){
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * app.songs.length)
    } while (newIndex === app.currentIndex)

    app.currentIndex = newIndex
  },

  scrollToActiveSong: function(){
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }, 300)
  },

  start: function() {
    this.defineProperties()

    this.render()

    this.handleEvents()

    this.loadCurrentSong()
  }
}
app.start()