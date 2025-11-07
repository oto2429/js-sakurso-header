// Authentication utility functions
class AuthService {
    static isLoggedIn() {
        return localStorage.getItem("loggedIn") === "true";
    }

    static getCurrentUser() {
        const currentUserEmail = localStorage.getItem("currentUser");
        const users = JSON.parse(localStorage.getItem("users")) || [];
        return users.find(user => user.email === currentUserEmail) || null;
    }

    static login(email) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", email);
    }

    static logout() {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("currentUser");
    }

    static updateNavigation() {
        const loginBtn = document.querySelector('.login-btn');
        const registerBtn = document.querySelector('.register-btn');
        const user = this.getCurrentUser();
        
        if (this.isLoggedIn() && user && loginBtn) {
            // Change login button to profile
            loginBtn.textContent = 'Profile';
            loginBtn.href = 'profile.html';
            loginBtn.classList.remove('login-btn');
            loginBtn.classList.add('profile-btn');
            loginBtn.style.background = '#2ecc71';
            loginBtn.style.borderColor = '#2ecc71';
            
            // Hide register button
            if (registerBtn) {
                registerBtn.style.display = 'none';
            }
            
            // Update mobile menu
            this.updateMobileMenu(user.name);
        }
    }

    static updateMobileMenu(userName) {
        const mobileLogin = document.getElementById('mobileLogin');
        const mobileRegister = document.getElementById('mobileRegister');
        const mobileProfile = document.getElementById('mobileProfile');
        
        if (mobileLogin) {
            mobileLogin.textContent = `Profile (${userName.split(' ')[0]})`;
            mobileLogin.href = 'profile.html';
            mobileLogin.style.display = 'block';
        }
        
        if (mobileRegister) {
            mobileRegister.style.display = 'none';
        }

        // Create or update mobile profile link
        if (!mobileProfile && this.isLoggedIn()) {
            this.createMobileProfileLink(userName);
        }
    }

    static createMobileProfileLink(userName) {
        const menu = document.querySelector('.menu ul');
        if (menu) {
            // Remove existing login/register links
            const loginLink = menu.querySelector('#mobileLogin');
            const registerLink = menu.querySelector('#mobileRegister');
            
            if (loginLink) loginLink.remove();
            if (registerLink) registerLink.remove();
            
            // Add profile link
            const profileLi = document.createElement('li');
            profileLi.innerHTML = `<a href="profile.html" id="mobileProfile">Profile (${userName.split(' ')[0]})</a>`;
            menu.appendChild(profileLi);
        }
    }

    static requireAuth(redirectUrl = 'login.html') {
        if (!this.isLoggedIn()) {
            Swal.fire({
                icon: 'warning',
                title: 'Authentication Required',
                text: 'Please log in or register to access this feature.',
                confirmButtonText: 'Go to Login',
                confirmButtonColor: '#e74c3c',
                showCancelButton: true,
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = redirectUrl;
                }
            });
            return false;
        }
        return true;
    }

    static requireAuthForPurchase() {
        if (!this.isLoggedIn()) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Please log in to add items to your cart and make purchases.',
                confirmButtonText: 'Go to Login',
                confirmButtonColor: '#e74c3c',
                showCancelButton: true,
                cancelButtonText: 'Continue Browsing'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'login.html';
                }
            });
            return false;
        }
        return true;
    }
}