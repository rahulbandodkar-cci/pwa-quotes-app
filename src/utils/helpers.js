import swal from 'sweetalert';

const helpers = {
    getURI: () => {
        let endpoint = window.location.search;
        let APIURI = '/quote';
        let slug = "";
        if(endpoint.length > 0){
            APIURI = `/quote/search${endpoint}`
            let slugIndex = endpoint.lastIndexOf('author=');
            slug = decodeURIComponent(endpoint.substring(slugIndex+7));
        }
        return {uri:APIURI,slug:slug};
    },
    getAlert: (title="",text="",icon="success") => {
        return swal(title, text, icon);
    }
}

export default helpers;
