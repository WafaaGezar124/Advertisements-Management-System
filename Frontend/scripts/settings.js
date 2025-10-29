/**
 * AdSphere - Settings & User Roles JavaScript
 * Handles all interactive functionality for settings and user management
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeUserManagement();
    initializeRoleManagement();
    initializeSystemSettings();
    initializeFormValidation();
    initializeSaveHandlers();
});

/**
 * Initialize User Management functionality
 */
function initializeUserManagement() {
    // Search functionality
    const searchInput = document.querySelector('.input-group input[placeholder="Search users..."]');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function(e) {
            filterUsers(e.target.value);
        }, 300));
    }

    // Role filter
    const roleFilter = document.querySelectorAll('#users .col-md-3 select')[0];
    if (roleFilter) {
        roleFilter.addEventListener('change', function(e) {
            filterUsersByRole(e.target.value);
        });
    }

    // Status filter
    const statusFilter = document.querySelectorAll('#users .col-md-3 select')[1];
    if (statusFilter) {
        statusFilter.addEventListener('change', function(e) {
            filterUsersByStatus(e.target.value);
        });
    }

    // Edit user buttons
    const editButtons = document.querySelectorAll('.btn-outline-primary');
    editButtons.forEach(btn => {
        if (btn.querySelector('.fa-edit')) {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                editUser(row);
            });
        }
    });

    // Delete user buttons
    const deleteButtons = document.querySelectorAll('.btn-outline-danger');
    deleteButtons.forEach(btn => {
        if (btn.querySelector('.fa-trash')) {
            btn.addEventListener('click', function() {
                const row = this.closest('tr');
                deleteUser(row);
            });
        }
    });

    // Add user modal form submission
    const addUserForm = document.querySelector('#addUserModal form');
    if (addUserForm) {
        addUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewUser();
        });
    }

    // Add user button in modal footer
    const addUserBtn = document.querySelector('#addUserModal .modal-footer .btn-primary');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            addNewUser();
        });
    }
}

/**
 * Filter users by search term
 */
function filterUsers(searchTerm) {
    const rows = document.querySelectorAll('#users tbody tr');
    const term = searchTerm.toLowerCase();
    
    rows.forEach(row => {
        const name = row.querySelector('strong')?.textContent.toLowerCase() || '';
        const email = row.querySelectorAll('td')[1]?.textContent.toLowerCase() || '';
        
        if (name.includes(term) || email.includes(term)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    updateUserCount();
}

/**
 * Filter users by role
 */
function filterUsersByRole(role) {
    const rows = document.querySelectorAll('#users tbody tr');
    
    rows.forEach(row => {
        const userRole = row.querySelectorAll('td')[2]?.textContent.trim() || '';
        
        if (role === 'All Roles' || userRole === role) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    updateUserCount();
}

/**
 * Filter users by status
 */
function filterUsersByStatus(status) {
    const rows = document.querySelectorAll('#users tbody tr');
    
    rows.forEach(row => {
        const userStatus = row.querySelectorAll('td')[3]?.textContent.trim() || '';
        
        if (status === 'All Status' || userStatus === status) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    updateUserCount();
}

/**
 * Update visible user count
 */
function updateUserCount() {
    const visibleRows = document.querySelectorAll('#users tbody tr:not([style*="display: none"])');
    console.log(`Showing ${visibleRows.length} users`);
}

/**
 * Edit user
 */
function editUser(row) {
    const name = row.querySelector('strong')?.textContent || '';
    const email = row.querySelectorAll('td')[1]?.textContent || '';
    const role = row.querySelectorAll('td')[2]?.textContent.trim() || '';
    const status = row.querySelectorAll('td')[3]?.textContent.trim() || '';
    
    // Create edit modal dynamically
    const modalHtml = `
        <div class="modal fade" id="editUserModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editUserForm">
                            <div class="mb-3">
                                <label class="form-label">Full Name</label>
                                <input type="text" class="form-control" value="${name}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email Address</label>
                                <input type="email" class="form-control" value="${email}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Role</label>
                                <select class="form-select" required>
                                    <option ${role === 'Admin' ? 'selected' : ''}>Admin</option>
                                    <option ${role === 'Manager' ? 'selected' : ''}>Manager</option>
                                    <option ${role === 'Client' ? 'selected' : ''}>Client</option>
                                    <option ${role === 'Influencer' ? 'selected' : ''}>Influencer</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Status</label>
                                <select class="form-select" required>
                                    <option ${status === 'Active' ? 'selected' : ''}>Active</option>
                                    <option ${status === 'Inactive' ? 'selected' : ''}>Inactive</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="saveUserEdit()">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if present
    const existingModal = document.getElementById('editUserModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('editUserModal'));
    modal.show();
}

/**
 * Save user edit
 */
window.saveUserEdit = function() {
    showNotification('User updated successfully!', 'success');
    const modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
    modal.hide();
}

/**
 * Delete user
 */
function deleteUser(row) {
    const name = row.querySelector('strong')?.textContent || '';
    
    if (confirm(`Are you sure you want to delete user "${name}"? This action cannot be undone.`)) {
        row.style.transition = 'opacity 0.3s ease';
        row.style.opacity = '0';
        
        setTimeout(() => {
            row.remove();
            showNotification('User deleted successfully!', 'success');
            updateUserCount();
        }, 300);
    }
}

/**
 * Add new user
 */
function addNewUser() {
    const form = document.querySelector('#addUserModal form');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const formData = {
        name: form.querySelector('input[type="text"]').value,
        email: form.querySelector('input[type="email"]').value,
        role: form.querySelector('select').value,
        password: form.querySelectorAll('input[type="password"]')[0].value,
        confirmPassword: form.querySelectorAll('input[type="password"]')[1].value,
        sendEmail: form.querySelector('#sendEmail').checked
    };
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
        showNotification('Passwords do not match!', 'danger');
        return;
    }
    
    // Validate password strength
    if (formData.password.length < 8) {
        showNotification('Password must be at least 8 characters long!', 'danger');
        return;
    }
    
    // Add user to table
    const tbody = document.querySelector('#users tbody');
    const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase();
    const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
    
    const roleColors = {
        'Admin': 'danger',
        'Manager': 'warning',
        'Client': 'info',
        'Influencer': 'purple'
    };
    
    const newRow = `
        <tr style="opacity: 0;">
            <td>
                <div class="d-flex align-items-center">
                    <div class="avatar me-2">${initials}</div>
                    <strong>${formData.name}</strong>
                </div>
            </td>
            <td>${formData.email}</td>
            <td><span class="badge bg-${roleColors[formData.role]}">${formData.role}</span></td>
            <td><span class="badge bg-success">Active</span></td>
            <td>${now}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `;
    
    tbody.insertAdjacentHTML('afterbegin', newRow);
    
    // Animate new row
    setTimeout(() => {
        tbody.querySelector('tr').style.transition = 'opacity 0.3s ease';
        tbody.querySelector('tr').style.opacity = '1';
    }, 10);
    
    // Re-initialize event listeners for new row
    initializeUserManagement();
    
    // Close modal and show success message
    const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
    modal.hide();
    
    showNotification(`User "${formData.name}" added successfully!`, 'success');
    
    // Reset form
    form.reset();
}

/**
 * Initialize Role Management functionality
 */
function initializeRoleManagement() {
    // Edit role buttons
    const roleEditButtons = document.querySelectorAll('.role-card .btn-outline-secondary');
    roleEditButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.role-card');
            editRole(card);
        });
    });
    
    // Add hover effects to role cards
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

/**
 * Edit role permissions
 */
function editRole(card) {
    const roleName = card.querySelector('h5')?.textContent || '';
    const description = card.querySelector('p')?.textContent || '';
    const checkboxes = card.querySelectorAll('.form-check-input');
    
    const permissions = {
        manageUsers: checkboxes[0]?.checked || false,
        manageCampaigns: checkboxes[1]?.checked || false,
        viewReports: checkboxes[2]?.checked || false,
        systemSettings: checkboxes[3]?.checked || false,
        financialAccess: checkboxes[4]?.checked || false
    };
    
    // Create edit role modal
    const modalHtml = `
        <div class="modal fade" id="editRoleModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Role: ${roleName}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editRoleForm">
                            <div class="mb-3">
                                <label class="form-label">Role Description</label>
                                <input type="text" class="form-control" value="${description}" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Permissions</label>
                                <div class="form-check mb-2">
                                    <input class="form-check-input" type="checkbox" id="editManageUsers" ${permissions.manageUsers ? 'checked' : ''}>
                                    <label class="form-check-label" for="editManageUsers">Manage Users</label>
                                </div>
                                <div class="form-check mb-2">
                                    <input class="form-check-input" type="checkbox" id="editManageCampaigns" ${permissions.manageCampaigns ? 'checked' : ''}>
                                    <label class="form-check-label" for="editManageCampaigns">Manage Campaigns</label>
                                </div>
                                <div class="form-check mb-2">
                                    <input class="form-check-input" type="checkbox" id="editViewReports" ${permissions.viewReports ? 'checked' : ''}>
                                    <label class="form-check-label" for="editViewReports">View Reports</label>
                                </div>
                                <div class="form-check mb-2">
                                    <input class="form-check-input" type="checkbox" id="editSystemSettings" ${permissions.systemSettings ? 'checked' : ''}>
                                    <label class="form-check-label" for="editSystemSettings">System Settings</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="editFinancialAccess" ${permissions.financialAccess ? 'checked' : ''}>
                                    <label class="form-check-label" for="editFinancialAccess">Financial Access</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" onclick="saveRoleEdit()">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if present
    const existingModal = document.getElementById('editRoleModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('editRoleModal'));
    modal.show();
}

/**
 * Save role edit
 */
window.saveRoleEdit = function() {
    showNotification('Role permissions updated successfully!', 'success');
    const modal = bootstrap.Modal.getInstance(document.getElementById('editRoleModal'));
    modal.hide();
}

/**
 * Initialize System Settings functionality
 */
function initializeSystemSettings() {
    // Logo upload button
    const logoUploadBtn = document.querySelector('.btn-outline-primary');
    if (logoUploadBtn && logoUploadBtn.textContent.includes('Upload Logo')) {
        logoUploadBtn.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    showNotification(`Logo "${file.name}" uploaded successfully!`, 'success');
                }
            };
            input.click();
        });
    }
    
    // Color pickers
    const colorInputs = document.querySelectorAll('input[type="color"]');
    colorInputs.forEach(input => {
        const textInput = input.nextElementSibling;
        
        input.addEventListener('change', function() {
            textInput.value = this.value;
        });
        
        textInput.addEventListener('input', function() {
            if (/^#[0-9A-F]{6}$/i.test(this.value)) {
                input.value = this.value;
            }
        });
    });
    
    // Toggle switches
    const toggleSwitches = document.querySelectorAll('.form-check-input[type="checkbox"]');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const label = this.nextElementSibling.querySelector('strong')?.textContent || 'Setting';
            const status = this.checked ? 'enabled' : 'disabled';
            console.log(`${label} ${status}`);
        });
    });
}

/**
 * Initialize form validation
 */
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}

/**
 * Initialize save handlers
 */
function initializeSaveHandlers() {
    // Save Settings button in System Settings tab
    const saveSettingsBtn = document.querySelector('#system .btn-primary');
    if (saveSettingsBtn && saveSettingsBtn.textContent.includes('Save Settings')) {
        saveSettingsBtn.addEventListener('click', function() {
            saveSystemSettings();
        });
    }
    
    // Reset to Default button
    const resetBtn = document.querySelector('.btn-outline-secondary');
    if (resetBtn && resetBtn.textContent.includes('Reset')) {
        resetBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to reset all settings to default values?')) {
                resetToDefault();
            }
        });
    }
}

/**
 * Save system settings
 */
function saveSystemSettings() {
    // Collect all settings
    const settings = {
        systemName: document.querySelector('input[value="AdSphere"]')?.value || '',
        primaryColor: document.querySelector('input[type="color"]')?.value || '',
        timeZone: document.querySelector('select')?.value || '',
        language: document.querySelectorAll('select')[1]?.value || '',
        notifications: {}
    };
    
    // Collect notification preferences
    const notificationToggles = document.querySelectorAll('.form-check-input[type="checkbox"]');
    notificationToggles.forEach(toggle => {
        const label = toggle.nextElementSibling.querySelector('strong')?.textContent || '';
        settings.notifications[label] = toggle.checked;
    });
    
    // Simulate save
    showLoadingNotification('Saving settings...');
    
    setTimeout(() => {
        hideLoadingNotification();
        showNotification('Settings saved successfully!', 'success');
        console.log('Saved settings:', settings);
    }, 1000);
}

/**
 * Reset to default settings
 */
function resetToDefault() {
    showLoadingNotification('Resetting to default...');
    
    setTimeout(() => {
        hideLoadingNotification();
        showNotification('Settings reset to default values!', 'info');
        location.reload();
    }, 1000);
}

/**
 * Show notification toast
 */
function showNotification(message, type) {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 150);
    }, 3000);
}

/**
 * Show loading notification
 */
function showLoadingNotification(message) {
    const loader = document.createElement('div');
    loader.id = 'loadingNotification';
    loader.className = 'alert alert-info position-fixed';
    loader.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    loader.innerHTML = `
        <div class="d-flex align-items-center">
            <div class="spinner-border spinner-border-sm me-2" role="status"></div>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(loader);
}

/**
 * Hide loading notification
 */
function hideLoadingNotification() {
    const loader = document.getElementById('loadingNotification');
    if (loader) {
        loader.remove();
    }
}

/**
 * Debounce utility function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Initialize avatar color generation
 */
function generateAvatarColors() {
    const avatars = document.querySelectorAll('.avatar');
    const colors = ['#0d6efd', '#6c757d', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6f42c1'];
    
    avatars.forEach((avatar, index) => {
        avatar.style.backgroundColor = colors[index % colors.length];
        avatar.style.color = '#fff';
        avatar.style.width = '40px';
        avatar.style.height = '40px';
        avatar.style.borderRadius = '50%';
        avatar.style.display = 'flex';
        avatar.style.alignItems = 'center';
        avatar.style.justifyContent = 'center';
        avatar.style.fontWeight = 'bold';
        avatar.style.fontSize = '14px';
    });
}

// Generate avatar colors on load
generateAvatarColors();

console.log('Settings page initialized successfully');
