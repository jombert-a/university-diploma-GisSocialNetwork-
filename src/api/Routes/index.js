import {instance} from "../index";

export const apiRoutes = {
    getRoutes() {
        return instance.get('Routes')
            .then (response => response.data)
    },
    getDetailById(id) {
      return instance.get(`Routes/${id}`)
          .then (response => response.data)
    },
    postRoute(route) {
        const token = sessionStorage.getItem('token');
        return instance.post('Routes', route,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    }
}