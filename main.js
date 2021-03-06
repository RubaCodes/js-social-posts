const posts = [
  {
    id: 1,
    content:
      'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
    media: 'https://unsplash.it/600/300?image=171',
    author: {
      name: 'Phil Mangione',
      image: 'https://unsplash.it/300/300?image=15',
    },
    likes: 80,
    created: '2021-06-25',
  },
  {
    id: 2,
    content:
      'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
    media: 'https://unsplash.it/600/400?image=112',
    author: {
      name: 'Sofia Perlari',
      image: 'https://unsplash.it/300/300?image=10',
    },
    likes: 120,
    created: '2021-09-03',
  },
  {
    id: 3,
    content:
      'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
    media: 'https://unsplash.it/600/400?image=234',
    author: {
      name: 'Chiara Passaro',
      image: 'https://unsplash.it/300/300?image=20',
    },
    likes: 78,
    created: '2021-05-15',
  },
  {
    id: 4,
    content:
      'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
    media: 'https://unsplash.it/600/400?image=24',
    author: {
      name: 'Luca Formicola',
      image: null,
    },
    likes: 56,
    created: '2021-04-03',
  },
  {
    id: 5,
    content:
      'Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.',
    media: 'https://unsplash.it/600/400?image=534',
    author: {
      name: 'Alessandro Sainato',
      image: 'https://unsplash.it/300/300?image=29',
    },
    likes: 95,
    created: '2021-03-05',
  },
];

//funzioni
//ritoran il markup html da postare in ogni post
function newPost(post) {
  return `<div class="post">
    <div class="post__header">
      <div class="post-meta">
        <div class="post-meta__icon">
          <img
            class="profile-pic"
            src=${post.author.image}
            alt=${post.author.alt}
          />
        </div>
        <div class="post-meta__data">
          <div class="post-meta__author">${post.author.name}</div>
          <div class="post-meta__time">${post.created}</div>
        </div>
      </div>
    </div>
    <div class="post__text">
      ${post.content}
    </div>
    <div class="post__image">
      <img src=${post.media} alt="" />
    </div>
    <div class="post__footer">
      <div class="likes js-likes">
        <div class="likes__cta">
          <a class="like-button js-like-button" href="#" data-postid="${post.id}">
            <i
              class="like-button__icon fas fa-thumbs-up"
              aria-hidden="true"
            ></i>
            <span class="like-button__label">Mi Piace</span>
          </a>
        </div>
        <div class="likes__counter">
          Piace a
          <b id="like-counter-1" class="js-likes-counter">
            ${post.likes}
          </b>
          persone
        </div>
      </div>
    </div>
  </div>`;
}

//querySelectors
const container = document.querySelector('#container');

//aggiunta dei post al container
for (let i = 0; i < posts.length; i++) {
  //manipolazioni date
  posts[i].created = posts[i].created.split('-').reverse().join('/');
  //aggiunt post alla pagina
  //gestore dell'alt per la profile pic
  if (posts[i].author.image == null) {
    posts[i].author.alt =
      posts[i].author.name.split(' ')[0][0] +
      posts[i].author.name.split(' ')[1][0];
  } else {
    posts[i].author.alt = posts[i].author.name;
  }
  container.innerHTML += newPost(posts[i]);
}

//aggiunta eventi ai like buttons
const likedID = [];
//hook ai selector necessari
const likeButtons = document.querySelectorAll('.like-button');
const likeCounter = document.querySelectorAll('#like-counter-1');
for (let i = 0; i < likeButtons.length; i++) {
  likeButtons[i].addEventListener('click', function (e) {
    e.preventDefault(); // annulla il back on top automatico della pagina al click del like
    if (!likedID.includes(posts[i].id)) {
      this.classList.add('like-button--liked');
      //aumenta i like nell' oggetto e nel html
      likeCounter[i].innerHTML = ++posts[i].likes;
      //aggiunto alla lista dei post 'likati'
      likedID.push(posts[i].id);
    } else {
      this.classList.remove('like-button--liked');
      //diminutisce i like nell' oggetto e nel html
      likeCounter[i].innerHTML = --posts[i].likes;
      //rimosso dalla lista dei post 'likati'
      likedID.pop(posts[i].id);
    }
  });
}
