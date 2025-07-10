// Authentication functions for SkillServe

// Login function
function login(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        setCurrentUser(user);
        return { success: true, user: user };
    }
    
    return { success: false, message: 'Invalid email or password' };
}

// Signup function
function signup(name, email, password, role) {
    const users = getUsers();
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        return { success: false, message: 'User with this email already exists' };
    }
    
    // Create new user
    const newUser = {
        id: generateId(),
        name: name,
        email: email,
        password: password,
        role: role,
        createdAt: new Date().toISOString()
    };
    
    addUser(newUser);
    setCurrentUser(newUser);
    
    return { success: true, user: newUser };
}

// Logout function
function logout() {
    clearCurrentUser();
    window.location.href = 'index.html';
}

// Check if user is authenticated
function isAuthenticated() {
    return getCurrentUser() !== null;
}

// Check if user has specific role
function hasRole(role) {
    const currentUser = getCurrentUser();
    return currentUser && currentUser.role === role;
}

// Setup event listeners for auth forms
document.addEventListener('DOMContentLoaded', () => {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            const result = login(email, password);
            
            if (result.success) {
                // Redirect based on role
                if (result.user.role === 'customer') {
                    window.location.href = 'customer-dashboard.html';
                } else if (result.user.role === 'worker') {
                    window.location.href = 'worker-dashboard.html';
                }
            } else {
                alert(result.message);
            }
        });
    }
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const role = document.getElementById('userRole').value;
            
            // Basic validation
            if (!name || !email || !password || !role) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long');
                return;
            }
            
            const result = signup(name, email, password, role);
            
            if (result.success) {
                // Redirect based on role
                if (result.user.role === 'customer') {
                    window.location.href = 'customer-dashboard.html';
                } else if (result.user.role === 'worker') {
                    window.location.href = 'register-worker.html';
                }
            } else {
                alert(result.message);
            }
        });
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password validation
function isValidPassword(password) {
    return password.length >= 6;
}

// Protected route function
function protectRoute(requiredRole) {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        window.location.href = 'index.html';
        return false;
    }
    
    if (requiredRole && currentUser.role !== requiredRole) {
        // Redirect to appropriate dashboard
        if (currentUser.role === 'customer') {
            window.location.href = 'customer-dashboard.html';
        } else if (currentUser.role === 'worker') {
            window.location.href = 'worker-dashboard.html';
        }
        return false;
    }
    
    return true;
}

// Update user profile
function updateUserProfile(updates) {
    const currentUser = getCurrentUser();
    if (!currentUser) return false;
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updates };
        saveUsers(users);
        setCurrentUser(users[userIndex]);
        return true;
    }
    
    return false;
}

// Get user stats
function getUserStats() {
    const currentUser = getCurrentUser();
    if (!currentUser) return null;
    
    const stats = {
        totalUsers: getUsers().length,
        totalWorkers: getWorkers().length,
        totalBookings: getBookings().length
    };
    
    if (currentUser.role === 'customer') {
        stats.myBookings = getBookings().filter(b => b.customerId === currentUser.id).length;
    } else if (currentUser.role === 'worker') {
        stats.myBookings = getBookings().filter(b => b.workerId === currentUser.id).length;
    }
    
    return stats;
}
