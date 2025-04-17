document.addEventListener('DOMContentLoaded', function() {
    // Interatividade do formulário Newsletter
    const newsletterForms = document.querySelectorAll('.newsletter-form, .cta-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                // Aqui seria adicionada a lógica real de inscrição na newsletter
                const notification = document.createElement('div');
                notification.className = 'notification success';
                notification.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    Obrigado por se inscrever! Em breve você receberá nossas novidades.
                `;
                this.appendChild(notification);
                emailInput.value = '';
                
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            }
        });
    });

    // Interatividade do formulário de busca
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="search"]');
            if (searchInput.value) {
                // Aqui seria adicionada a lógica real de busca
                console.log('Pesquisando por:', searchInput.value);
            }
        });
    }

    // Interatividade dos links de categoria
    const categoryLinks = document.querySelectorAll('.nav-links a, .categorias a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            
            // Adiciona a classe active ao link clicado se estiver na navegação principal
            if (this.closest('.nav-links')) {
                this.classList.add('active');
            }
            
            // Aqui seria adicionada a lógica real de filtro por categoria
            const category = this.textContent.trim().split('(')[0].trim();
            console.log('Categoria selecionada:', category);
        });
    });

    // Efeitos de hover nos cards de posts
    const postCards = document.querySelectorAll('.post-card, .destaque-post');
    postCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Efeito de scroll suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 100;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Adiciona animação de fade-in aos posts quando eles entram na viewport
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplica o efeito de fade-in em todos os posts
    document.querySelectorAll('.post-card, .destaque-post').forEach(post => {
        post.style.opacity = '0';
        post.style.transform = 'translateY(20px)';
        post.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(post);
    });

    // Adiciona notificação de cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        const cookieNotice = document.createElement('div');
        cookieNotice.className = 'cookie-notice';
        cookieNotice.innerHTML = `
            <div class="cookie-content">
                <p>Utilizamos cookies para melhorar sua experiência em nosso site. 
                   Ao continuar navegando, você concorda com nossa 
                   <a href="#">Política de Privacidade</a>.</p>
                <button class="accept-cookies">Aceitar</button>
            </div>
        `;
        document.body.appendChild(cookieNotice);

        // Adiciona estilos para o aviso de cookies
        const style = document.createElement('style');
        style.textContent = `
            .cookie-notice {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background-color: rgba(255, 255, 255, 0.95);
                padding: 1rem;
                box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
                z-index: 1000;
            }
            .cookie-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
            }
            .accept-cookies {
                background-color: var(--accent-color);
                color: var(--primary-color);
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
            }
            .accept-cookies:hover {
                background-color: var(--primary-color);
                color: white;
            }
            .notification {
                position: absolute;
                bottom: 100%;
                left: 0;
                right: 0;
                padding: 1rem;
                margin-bottom: 0.5rem;
                border-radius: 4px;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                animation: slideIn 0.3s ease;
            }
            .notification.success {
                background-color: #d4edda;
                color: #155724;
            }
            @keyframes slideIn {
                from { transform: translateY(10px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Manipula o clique no botão de aceitar cookies
        document.querySelector('.accept-cookies').addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieNotice.remove();
        });
    }

    // Seleciona os elementos do modal
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content');
    const modalClose = document.querySelector('.modal-close');
    const modalImg = document.querySelector('.modal-img');
    const modalCategory = document.querySelector('.modal-category');
    const modalTitle = document.querySelector('.modal-title');
    const modalDate = document.querySelector('.modal-date');
    const modalTime = document.querySelector('.modal-time');
    const modalAuthor = document.querySelector('.modal-author');
    const modalText = document.querySelector('.modal-text');
    const modalTags = document.querySelector('.modal-tags');
    const modalLink = document.querySelector('.modal-link');

    // Função para abrir o modal com os dados do post
    function openModal(postData) {
        modalImg.src = postData.imgSrc;
        modalImg.alt = postData.title;
        modalCategory.textContent = postData.category;
        modalTitle.textContent = postData.title;
        modalDate.textContent = postData.date;
        modalTime.textContent = postData.time;
        modalAuthor.textContent = postData.author;
        modalText.textContent = postData.excerpt;
        modalLink.href = postData.link;

        modalTags.innerHTML = '';
        
        postData.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tag;
            modalTags.appendChild(tagElement);
        });

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    // Função para fechar o modal
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // Adiciona o evento de clique a todos os botões "Ler mais"
    const lerMaisButtons = document.querySelectorAll('.leia-mais');    
    lerMaisButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const postCard = button.closest('.post-card, .destaque-post');
            
            const postData = {
                imgSrc: postCard.querySelector('img').src,
                category: postCard.querySelector('.category').textContent,
                title: postCard.querySelector('h2, h3').textContent,
                date: postCard.querySelector('.post-meta i.fa-calendar').nextSibling.textContent.trim(),
                time: postCard.querySelector('.post-meta i.fa-clock')?.nextSibling.textContent.trim() || '',
                author: postCard.querySelector('.post-meta i.fa-user').nextSibling.textContent.trim(),
                excerpt: postCard.querySelector('.trecho-post').textContent,
                tags: Array.from(postCard.querySelectorAll('.tag')).map(tag => tag.textContent),
                link: button.href
            };

            openModal(postData);
        });
    });

    // Fecha o modal quando o botão de fechar é clicado
    if (modalClose) {
        modalClose.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    // Fecha o modal quando o clique é fora dele
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Fecha o modal quando a tecla Escape é pressionada
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // Impede o modal de fechar quando o clique é dentro do conteúdo do modal
    if (modalContent) {
        modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}); 