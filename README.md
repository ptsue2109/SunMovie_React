# SunMovie_React

# Làm việc với router:
  ##. Khai báo router vào file src/config/routes.tsx 
      vd: home: "/home" trong đó : 'home' là tên router, '/' là path 
        với những route có params, khai báo:  productDetail: "/san-pham/:params(id, slug,...)"
        
  ##. vào file src/routes/index.tsx để khai báo type của router  (public của client, private của admin)
  ##. Gọi router ra sử dụng
      3.1. Import config từ file src/config/
      3.2. Gọi = cách sử dụng : config.routes.tên_router
        vd: <Link to={config.routes.home} ></Link>
        
#. Làm việc với redux
  ##. Các file cần quan tâm : hook , rootReducer, slice
    ###. Hook : có 2 hook trong pj mình đang dùng là useAppDispatch và useAppSelector
          trong đó: useAppDispatch mình sẽ gọi khi thực hiện 1 action nào đó , có thể là thêm,update,..tóm lại là crud mình sẽ sd
                    useAppSelector: khi cần dùng đến các reducer nào mình sẽ gọi hook này ra để lấy
                    
    ###. rootReducer :  trong này cần quan tâm 2 cái chính: whitelist và reducers 
          1.2.1. Whitelist :
            Mình đang sử dụng redux-persist để lưu dữ liệu lên localStorage ( data sẽ tự động update nếu có sự thay đổi), vì vậy sử dụng whitelisst để lưu data mà 
            mình muốn lưu trên local. Thường thì mình sẽ hỉ sử dụng trong việc lưu Giỏ hàng (add to cart) , đăng nhập (login) và email (emailSending status)
          
          1.2.2. reducers
          lưu tất cả các reducer sử dụng redux ở đây
          
    
    ###. Slice: trong này mình viết gộp chung thunk, slice lại với nhau
          1.3.1. Thunk : nó là middleware,viết code logic, xử lí bất đồng bộ các kiểu, nói chung động đến data là phải lấy qua thằng này, thằng này cũng là thằng để                          mình gọi khi thực  hiện 1 dispatch action và nó cx được gọi ở extraReducers bên dưới
          1.3.2. Slice : trong này lại cần chú ý đến initialState và phần quan trọng nhất: CreateSlice
              - Intinial state thì cái tên nói lên tất cả: cấu hình data sẽ trả về
              - CreatSlice: 
                b1: tạo tên Slice = cú pháp const Tên_slice =createSlice({
                                                              name: 'tên_của_slice',
                                                              intinialState,
                                                              reducer:{}, (cái này xl những data cực đơn giản, có thể hiểu nó là getter và setter, pj này mk ísd),
                                                               extraReducers(builder) {  
                                                                //giải quyết các case dispatch action phổ biến như lắng nghe 1 action chung nào đó của toàn bộ ứng dụng
                                                                // có 3 trạng thái : fullfill(xl data thành công), pending(đang xl), reject(lỗi) 
                                                                //viết theo cú pháp
                                                                builder.addCase(tên_của_thunk_cần_xl.trạng_thái(fullfill | pending| reject), (state, action) => {
                                                                    state.cái_gì_đó_ở_intinialState = action.payload
                                                                }
                                                               }
                                                               }):
        
              b2: Export để dùng
                    //nếu có dispatch action viết ở reducer, k có thì thôi
                    export const { clearState, refreshToken } = tên_của_slice.actions;
                   
                   //khai báo slice để sd
                    export default tên_của_slice.reducer;
 
  ### Các bước sử dụng redux trong pj này
    b1. Cần api đã,api  viết ở trong folder service/
    b2. vào src/redux/slice/ tạo mới 1 file Slice , vd : src/redux/slice/AuthSlice.tsx 
    b3. Tại file Slice, khai báo các action dispatch (hay còn gọi là thunk) (sd api để viết cùng, xem vd trên brach dev)
    b4. tạo initialState
    b4. tạo Slice sd cú pháp:   const authSlice = createSlice({ }} và khai báo name, initialState, và các reducer hoặc  extraReducers
    b5. Export thằng slice ra
    b6. vào file src/redux/rootReducer.tsx và khai báo nó là 1 reducer,  cú pháp: import authReducer from "./slice/AuthSlice"
    b7. khai báo nó xuống bên dưới để sd. Cú pháp 
      const reducers = combineReducers({ authReducer, productReducer.....})
    
  ### Sử dụng redux trong component/page
    Sử dụng với 2 hook useAppDispatch và useAppSelector
    b1: khai báo hook để sd , vd: import { useAppDispatch, useAppSelector} from "../../../redux/hook";
    b2:  - nếu lấy dữ liệu:
        const {data_muốn_lấy_mà_đã_khai_báo_ở_initialState} = useAppSelector(state => state.tên_reducer (nếu ctrl tab mà k ra tên reducer chứng tỏ chưa khai báo trong          rootReducer)
        
        - nếu muốn dispatch 1 action 
          khai báo: dispatch = useAppDispatch()
          vd: dispatch(getData()) hoặc  dispatch(createData(data))
          
    
