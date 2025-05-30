// Données du portfolio
let portfolioData = {
    name: '',
    bio: '',
    skills: [],
    projects: [],
    social: {
        github: '',
        linkedin: ''
    }
};

// Animation des particules
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Mise à jour du portfolio avec animations
function updatePortfolio() {
    showLoader();
    
    // Récupération des données du formulaire
    portfolioData.name = document.getElementById('fullName').value || 'Votre Nom';
    portfolioData.bio = document.getElementById('bio').value || 'Votre biographie apparaîtra ici...';
    
    const skillsInput = document.getElementById('skills').value;
    portfolioData.skills = skillsInput ? skillsInput.split(',').map(skill => skill.trim()) : [];
    
    portfolioData.social.github = document.getElementById('github').value;
    portfolioData.social.linkedin = document.getElementById('linkedin').value;

    setTimeout(() => {
        updateDisplay();
        hideLoader();
        showSuccessAnimation();
    }, 1000);
}

// Affichage des données avec animations
function updateDisplay() {
    // Mise à jour du nom avec effet de glow
    const nameElement = document.getElementById('displayName');
    nameElement.style.animation = 'none';
    nameElement.textContent = portfolioData.name;
    setTimeout(() => {
        nameElement.style.animation = 'textGlow 3s ease-in-out infinite alternate';
    }, 100);

    // Mise à jour de la bio avec effet de typing
    const bioElement = document.getElementById('displayBio');
    if (portfolioData.bio !== 'Votre biographie apparaîtra ici...') {
        typeText(bioElement, portfolioData.bio);
    } else {
        bioElement.textContent = portfolioData.bio;
    }

    // Mise à jour des compétences avec animations
    updateSkills();
    
    // Mise à jour des liens sociaux
    updateSocialLinks();
}

// Effet de typing pour la bio
function typeText(element, text) {
    element.textContent = '';
    element.classList.add('typing-effect');
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            setTimeout(() => {
                element.classList.remove('typing-effect');
            }, 1000);
        }
    }, 50);
}

// Mise à jour des compétences avec animations
function updateSkills() {
    const skillsContainer = document.getElementById('skillsContainer');
    skillsContainer.innerHTML = '';

    portfolioData.skills.forEach((skill, index) => {
        setTimeout(() => {
            const skillBadge = document.createElement('div');
            skillBadge.className = 'skill-badge';
            skillBadge.textContent = skill;
            skillBadge.style.animationDelay = (index * 0.1) + 's';
            skillsContainer.appendChild(skillBadge);
        }, index * 100);
    });
}

// Ajout d'un projet avec animation
function addProject() {
    const projectName = document.getElementById('projectName').value;
    const projectDesc = document.getElementById('projectDesc').value;
    const projectLink = document.getElementById('projectLink').value;

    if (projectName && projectDesc) {
        const project = {
            name: projectName,
            description: projectDesc,
            link: projectLink
        };

        portfolioData.projects.push(project);
        updateProjectsDisplay();
        
        // Reset des champs projet
        document.getElementById('projectName').value = '';
        document.getElementById('projectDesc').value = '';
        document.getElementById('projectLink').value = '';

        showProjectAddedAnimation();
    }
}

// Affichage des projets avec animations
function updateProjectsDisplay() {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';

    portfolioData.projects.forEach((project, index) => {
        setTimeout(() => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card fade-in';
            projectCard.innerHTML = `
                <h4 style="color: var(--primary-color); margin-bottom: 0.5rem;">${project.name}</h4>
                <p style="margin-bottom: 1rem; color: var(--text-muted);">${project.description}</p>
                ${project.link ? `<a href="${project.link}" target="_blank" style="color: var(--accent-color); text-decoration: none;">Voir le projet →</a>` : ''}
            `;
            projectsGrid.appendChild(projectCard);
        }, index * 200);
    });
}

// Mise à jour des liens sociaux
function updateSocialLinks() {
    const socialLinks = document.getElementById('socialLinks');
    socialLinks.innerHTML = '';

    if (portfolioData.social.github) {
        const githubLink = document.createElement('a');
        githubLink.href = portfolioData.social.github;
        githubLink.target = '_blank';
        githubLink.className = 'social-link';
        githubLink.textContent = 'GitHub';
        socialLinks.appendChild(githubLink);
    }

    if (portfolioData.social.linkedin) {
        const linkedinLink = document.createElement('a');
        linkedinLink.href = portfolioData.social.linkedin;
        linkedinLink.target = '_blank';
        linkedinLink.className = 'social-link';
        linkedinLink.textContent = 'LinkedIn';
        socialLinks.appendChild(linkedinLink);
    }
}

// Réinitialisation avec animation
function resetPortfolio() {
    showLoader();
    
    setTimeout(() => {
        portfolioData = {
            name: '',
            bio: '',
            skills: [],
            projects: [],
            social: { github: '', linkedin: '' }
        };

        document.getElementById('portfolioForm').reset();
        
        document.getElementById('displayName').textContent = 'Votre Nom';
        document.getElementById('displayBio').textContent = 'Votre biographie apparaîtra ici...';
        document.getElementById('skillsContainer').innerHTML = '';
        document.getElementById('projectsGrid').innerHTML = '';
        document.getElementById('socialLinks').innerHTML = '';
        
        hideLoader();
        showResetAnimation();
    }, 1000);
}

// Animations de feedback
function showLoader() {
    document.getElementById('loader').style.display = 'block';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

function showSuccessAnimation() {
    const profileCard = document.getElementById('profileCard');
    profileCard.style.animation = 'pulse 0.6s ease-in-out';
    setTimeout(() => {
        profileCard.style.animation = '';
    }, 600);
}

function showProjectAddedAnimation() {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.style.animation = 'fadeInUp 0.8s ease-out';
    setTimeout(() => {
        projectsGrid.style.animation = '';
    }, 800);
}

function showResetAnimation() {
    const previewSection = document.querySelector('.preview-section');
    previewSection.style.animation = 'fadeIn 1s ease-out';
    setTimeout(() => {
        previewSection.style.animation = '';
    }, 1000);
}

// Mise à jour en temps réel
document.getElementById('fullName').addEventListener('input', function() {
    document.getElementById('displayName').textContent = this.value || 'Votre Nom';
});

document.getElementById('bio').addEventListener('input', function() {
    document.getElementById('displayBio').textContent = this.value || 'Votre biographie apparaîtra ici...';
});

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    
    // Animation d'entrée séquentielle
    setTimeout(() => {
        document.querySelector('.form-section').style.animation = 'fadeInUp 1s ease-out';
    }, 300);
    
    setTimeout(() => {
        document.querySelector('.preview-section').style.animation = 'fadeInUp 1s ease-out';
    }, 600);
});

// Effet de parallaxe au scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.animated-bg');
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
});