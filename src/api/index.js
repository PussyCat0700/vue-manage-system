import request from '../utils/request';
import post from '../utils/request';

export const fetchData = query => {
    return request({
        url: 'http://localhost:8999/create/country/all',
        method: 'get',
        params: query
    });
};

export const updateCountry = config => {
	// CORS problem unsolved. Use Get temporarily (very unsafe)
    // return post('http://localhost:8999/create/test', config);
	return request({
        url: 'http://localhost:8999/create/modify/test',
        method: 'get',
        params: config
    });
};
