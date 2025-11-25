/**
 * GitHub API Manager
 * Handles file uploads to GitHub repository via API
 */
const githubManager = {
    // Configuration
    config: {
        token: localStorage.getItem('wm_github_token') || '',
        owner: localStorage.getItem('wm_github_owner') || 'marinokim',
        repo: localStorage.getItem('wm_github_repo') || 'woorimiracle-renewal',
        branch: localStorage.getItem('wm_github_branch') || 'main'
    },

    // Save configuration
    saveConfig(token, owner, repo, branch) {
        this.config.token = token;
        this.config.owner = owner;
        this.config.repo = repo;
        this.config.branch = branch;

        localStorage.setItem('wm_github_token', token);
        localStorage.setItem('wm_github_owner', owner);
        localStorage.setItem('wm_github_repo', repo);
        localStorage.setItem('wm_github_branch', branch);
    },

    // Check if configured
    isConfigured() {
        return !!this.config.token;
    },

    // Convert file to Base64
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = error => reject(error);
        });
    },

    // Upload file to GitHub
    async uploadFile(file, path, message = 'Upload file via Admin') {
        if (!this.isConfigured()) {
            throw new Error('GitHub Token is not configured.');
        }

        try {
            const content = await this.fileToBase64(file);
            const url = `https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/${path}`;

            // Check if file exists (to get SHA for update)
            let sha = null;
            try {
                const checkResponse = await fetch(url, {
                    headers: {
                        'Authorization': `token ${this.config.token}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });
                if (checkResponse.ok) {
                    const data = await checkResponse.json();
                    sha = data.sha;
                }
            } catch (e) {
                // File doesn't exist, proceed with create
            }

            // Upload (Create or Update)
            const body = {
                message: message,
                content: content,
                branch: this.config.branch
            };
            if (sha) {
                body.sha = sha;
            }

            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.config.token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Upload failed');
            }

            const result = await response.json();
            return result.content.download_url; // Or construct relative path

        } catch (error) {
            console.error('GitHub Upload Error:', error);
            throw error;
        }
    }
};
