// localStorage management for SkillServe

// Users management
function getUsers() {
    const users = localStorage.getItem('skillserve_users');
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem('skillserve_users', JSON.stringify(users));
}

function addUser(user) {
    const users = getUsers();
    users.push(user);
    saveUsers(users);
}

function findUserByEmail(email) {
    const users = getUsers();
    return users.find(user => user.email === email);
}

// Workers management
function getWorkers() {
    const workers = localStorage.getItem('skillserve_workers');
    if (!workers) {
        // Initialize with expanded sample workers
        const sampleWorkers = [
            {
                id: '1',
                userId: 'sample1',
                name: 'Nagarjun',
                profession: 'Electrician',
                experience: '2',
                location: 'Mandya, Karnataka',
                contact: '+91 1234567890',
                description: 'Licensed electrician with 5 years of experience in residential and commercial work. Specializing in electrical installations, repairs, and safety inspections.',
                available: true,
                rating: 4.8,
                completedJobs: 127,
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                userId: 'sample2',
                name: 'Nithin',
                profession: 'Plumber',
                experience: '8',
                location: 'Malavalli, Karnataka',
                contact: '+91 1234563490',
                description: 'Expert plumber specializing in emergency repairs and installations. Available 24/7 for urgent plumbing issues.',
                available: true,
                rating: 4.9,
                completedJobs: 203,
                createdAt: new Date().toISOString()
            },
            {
                id: '3',
                userId: 'sample3',
                name: 'Poorvik',
                profession: 'Painter',
                experience: '3',
                location: 'Maddur, karnataka',
                contact: '+91 2342567890',
                description: 'Professional painter offering interior and exterior painting services. Eco-friendly paints available.',
                available: false,
                rating: 4.7,
                completedJobs: 89,
                createdAt: new Date().toISOString()
            },
            {
                id: '4',
                userId: 'sample4',
                name: 'Charan',
                profession: 'Carpenter',
                experience: '10',
                location: 'Mysuru, Karnataka',
                contact: '+91 9911167890',
                description: 'Master carpenter with expertise in custom furniture and home renovations. Quality craftsmanship guaranteed.',
                available: true,
                rating: 4.9,
                completedJobs: 156,
                createdAt: new Date().toISOString()
            },
            {
                id: '5',
                userId: 'sample5',
                name: 'Browney',
                profession: 'Cleaner',
                experience: '2',
                location: 'Bengalore, Karnataka',
                contact: '+91 8999567890',
                description: 'Professional cleaning service for homes and offices. Eco-friendly products and flexible scheduling.',
                available: true,
                rating: 4.6,
                completedJobs: 78,
                createdAt: new Date().toISOString()
            },
            {
                id: '6',
                userId: 'sample6',
                name: 'nandan',
                profession: 'Mechanic',
                experience: '7',
                location: 'Pandavapura, Karnataka',
                contact: '+91 8777567890',
                description: 'Certified automotive mechanic specializing in foreign and domestic vehicles. Mobile service available.',
                available: true,
                rating: 4.8,
                completedJobs: 142,
                createdAt: new Date().toISOString()
            },
            {
                id: '7',
                userId: 'sample7',
                name: 'Mohith',
                profession: 'Electrician',
                experience: '4',
                location: 'Bengalore, Karnataka',
                contact: '+91 9999000090',
                description: 'Young and energetic electrician specializing in solar panel installations and green energy solutions.' ,
                available: true,
                rating: 4.7,
                completedJobs: 95,
                createdAt: new Date().toISOString()
            },
            {
                id: '8',
                userId: 'sample8',
                name: 'Kunal',
                profession: 'Plumber',
                experience: '6',
                location: 'Mysuru, Karnataka',
                contact: '+91 1234567123',
                description: 'Licensed plumber with expertise in modern plumbing systems and water conservation solutions.',
                available: false,
                rating: 4.8,
                completedJobs: 118,
                createdAt: new Date().toISOString()
            },
            {
                id: '9',
                userId: 'sample9',
                name: 'Manvith',
                profession: 'Painter',
                experience: '5',
                location: 'Ramanagara, Karnataka',
                contact: '+91 9900967890',
                description: 'Artistic painter specializing in decorative finishes and color consultation. Transform your space!',
                available: true,
                rating: 4.9,
                completedJobs: 134,
                createdAt: new Date().toISOString()
            },
            {
                id: '10',
                userId: 'sample10',
                name: 'Poorna',
                profession: 'Carpenter',
                experience: '12',
                location: 'Mysore, Karnataka',
                contact: '+91 8990567890',
                description: 'Experienced carpenter specializing in kitchen and bathroom renovations. Licensed and insured.',
                available: true,
                rating: 4.9,
                completedJobs: 287,
                createdAt: new Date().toISOString()
            },
            {
                id: '11',
                userId: 'sample11',
                name: 'kishan',
                profession: 'Cleaner',
                experience: '4',
                location: 'Mandya, Karnataka',
                contact: '+91 1234500000',
                description: 'Detail-oriented cleaning professional offering residential and commercial services. Bonded and insured.',
                available: true,
                rating: 4.7,
                completedJobs: 156,
                createdAt: new Date().toISOString()
            },
            {
                id: '12',
                userId: 'sample12',
                name: 'Pavan',
                profession: 'Mechanic',
                experience: '9',
                location: 'Mysuru, Karnataka',
                contact: '+91 1122367890',
                description: 'ASE certified mechanic with expertise in diesel engines and heavy machinery repair.',
                available: true,
                rating: 4.8,
                completedJobs: 198,
                createdAt: new Date().toISOString()
            },
            {
                id: '13',
                userId: 'sample13',
                name: 'Keeru',
                profession: 'Electrician',
                experience: '3',
                location: 'Mandya, Karnataka',
                contact: '+91 9990007890',
                description: 'Female electrician specializing in smart home installations and energy-efficient solutions.',
                available: false,
                rating: 4.6,
                completedJobs: 67,
                createdAt: new Date().toISOString()
            },
            {
                id: '14',
                userId: 'sample14',
                name: 'Koustub',
                profession: 'Plumber',
                experience: '11',
                location: 'Bengalore, Karnataka',
                contact: '+91 0987667890',
                description: 'Master plumber with over a decade of experience. Specializing in pipe replacement and water heater installation.',
                available: true,
                rating: 4.9,
                completedJobs: 245,
                createdAt: new Date().toISOString()
            },
            {
                id: '15',
                userId: 'sample15',
                name: 'Singer Arjun',
                profession: 'Painter',
                experience: '6',
                location: 'Delhi',
                contact: '+91 9876543210',
                description: 'Professional painter with an eye for detail. Specializing in faux finishes and mural work.',
                available: true,
                rating: 4.8,
                completedJobs: 112,
                createdAt: new Date().toISOString()
            }
        ];
        saveWorkers(sampleWorkers);
        return sampleWorkers;
    }
    return JSON.parse(workers);
}

function saveWorkers(workers) {
    localStorage.setItem('skillserve_workers', JSON.stringify(workers));
}

function addWorker(worker) {
    const workers = getWorkers();
    workers.push(worker);
    saveWorkers(workers);
}

// Function to reset worker data (useful for testing changes)
function resetWorkerData() {
    localStorage.removeItem('skillserve_workers');
    console.log('Worker data reset. Refresh the page to see updated worker names.');
}

// Bookings management
function getBookings() {
    const bookings = localStorage.getItem('skillserve_bookings');
    return bookings ? JSON.parse(bookings) : [];
}

function saveBookings(bookings) {
    localStorage.setItem('skillserve_bookings', JSON.stringify(bookings));
}

function addBooking(booking) {
    const bookings = getBookings();
    bookings.push(booking);
    saveBookings(bookings);
}

// Session management
function getCurrentUser() {
    const currentUser = localStorage.getItem('skillserve_current_user');
    return currentUser ? JSON.parse(currentUser) : null;
}

function setCurrentUser(user) {
    localStorage.setItem('skillserve_current_user', JSON.stringify(user));
}

function clearCurrentUser() {
    localStorage.removeItem('skillserve_current_user');
}

// Account deletion functions
function deleteUserAccount(userId) {
    // Delete user from users array
    const users = getUsers();
    const filteredUsers = users.filter(user => user.id !== userId);
    saveUsers(filteredUsers);
    
    // Delete all bookings related to this customer
    const bookings = getBookings();
    const filteredBookings = bookings.filter(booking => booking.customerId !== userId);
    saveBookings(filteredBookings);
    
    // Note: We don't delete worker profile here as it's handled separately
}

function deleteWorkerAccount(userId, workerId) {
    // Delete user from users array
    const users = getUsers();
    const filteredUsers = users.filter(user => user.id !== userId);
    saveUsers(filteredUsers);
    
    // Delete worker profile
    const workers = getWorkers();
    const filteredWorkers = workers.filter(worker => worker.id !== workerId);
    saveWorkers(filteredWorkers);
    
    // Cancel all pending bookings for this worker
    const bookings = getBookings();
    const updatedBookings = bookings.map(booking => {
        if (booking.workerId === workerId && booking.status === 'pending') {
            return { ...booking, status: 'cancelled', cancelledAt: new Date().toISOString() };
        }
        return booking;
    });
    saveBookings(updatedBookings);
}

// Utility functions
function generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

function clearAllData() {
    localStorage.removeItem('skillserve_users');
    localStorage.removeItem('skillserve_workers');
    localStorage.removeItem('skillserve_bookings');
    localStorage.removeItem('skillserve_current_user');
}

// Initialize sample data if needed
function initializeSampleData() {
    const users = getUsers();
    if (users.length === 0) {
        // Add sample customer
        const sampleCustomer = {
            id: generateId(),
            name: 'Demo Customer',
            email: 'customer@demo.com',
            password: 'sample123',
            role: 'customer',
            createdAt: new Date().toISOString()
        };
        addUser(sampleCustomer);

        // Add sample worker user
        const sampleWorkerUser = {
            id: generateId(),
            name: 'Demo Worker',
            email: 'worker@demo.com',
            password: 'sample123',
            role: 'worker',
            createdAt: new Date().toISOString()
        };
        addUser(sampleWorkerUser);
    }
}

// Initialize sample data on load
initializeSampleData();
