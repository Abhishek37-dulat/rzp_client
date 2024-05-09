const urls = {
  auth: {
    signup: "http://localhost:8001/api/user/signup",
    login: "http://localhost:8001/api/user/login",
    verify: "http://localhost:8001/api/user/verify",
    premium: "http://localhost:8001/api/payment/premium",
  },
  expense: {
    add: "http://localhost:8001/api/exp/add",
    update: "http://localhost:8001/api/exp/sig",
    getall: "http://localhost:8001/api/exp/all",
    single: "http://localhost:8001/api/exp/sig",
    delete: "http://localhost:8001/api/exp/delete",
  },
};

export default urls;
