export const API_URLS = {
    saveSentEmail: {
        endpoint: 'save',
        method: 'POST'
    },
    getEmailFromType: {
        endpoint: 'emails',
        method: 'GET'
    },
    saveDraftEmails: {
        endpoint: 'save-draft',
        method: 'POST'
    },
    moveEmailsToBin: {
        endpoint: 'trash',
        method: 'POST'
    },
    toggleStarredEmails: {
        endpoint:'starred',
        method: 'POST'
    },
    deleteEmail: {
        endpoint: 'delete',
        method: 'DELETE'
    },
    updateEmailLabel: {
        endpoint: 'label',
        method: 'PUT'
    }
}