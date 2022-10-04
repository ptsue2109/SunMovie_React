import React from 'react'
import { Link } from 'react-router-dom'
import styles from './BookChair.module.css'
type Props = {}

const BookChair = (props: Props) => {
  return (
    <>
      <div className={styles.container}>
            <div className={styles.title}>
                <h3>Chọn ghế</h3>
                <p>Bạn đã chọn: <span>AVATAR 2</span> </p>
                <p>Phòng chiếu: 5</p>
                <p>Suất chiếu: 16:00 - 29/05/2022</p>
            </div>

        {/* chair */}
        <div className='mt-20 grid grid-cols-[900px,300px] gap-10 '>
      <div className='border border-[#ccc] rounded-md p-10 '>
        <p className='text-white'>Để chọn ghế vui lòng chọn ghế ưa thích theo icon</p>
        <p className='text-white'>Click tiếp vào ghế đã chọn để xoá lựa chọn</p>
        <div className='my-10'>
          <img className='mx-auto' src="https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/img49.png" alt="" />
        </div>

        {/* chair */}
        <div className='relative my-4'>
          <p className='absolute left-1 text-white'>A</p>
          <div className='absolute top-0 right-1 text-white'>A</div>
          <div className={styles.chair}>
            <span><button>1</button></span>
            <span><button>2</button></span>
            <span><button>3</button></span>
            <span><button>4</button></span>
            <span><button>5</button></span>
            <span><button>6</button></span>
            <span><button>7</button></span>
            <span><button>8</button></span>
            <span><button>8</button></span>
            <span><button>10</button></span>
            <span><button>11</button></span>
            <span><button>12</button></span>
            <span><button>13</button></span>
            <span><button>14</button></span>
            <span><button>15</button></span>
          </div>
          
        </div>
        
        <div className='relative my-4'>
          <p className='absolute left-1 text-white'>B</p>
          <div className='absolute top-0 right-1 text-white'>B</div>
          <div className={styles.chair}>
            <span><button>1</button></span>
            <span><button>2</button></span>
            <span><button>3</button></span>
            <span><button>4</button></span>
            <span><button>5</button></span>
            <span><button>6</button></span>
            <span><button>7</button></span>
            <span><button>8</button></span>
            <span><button>8</button></span>
            <span><button>10</button></span>
            <span><button>11</button></span>
            <span><button>12</button></span>
            <span><button>13</button></span>
            <span><button>14</button></span>
            <span><button>15</button></span>
          </div>
          
        </div>
        <div className='relative my-4'>
          <p className='absolute left-1 text-white'>C</p>
          <div className='absolute top-0 right-1 text-white'>C</div>
          <div className={styles.chair}>
            <span><button>1</button></span>
            <span><button>2</button></span>
            <span><button>3</button></span>
            <span><button>4</button></span>
            <span><button>5</button></span>
            <span><button>6</button></span>
            <span><button>7</button></span>
            <span><button>8</button></span>
            <span><button>8</button></span>
            <span><button>10</button></span>
            <span><button>11</button></span>
            <span><button>12</button></span>
            <span><button>13</button></span>
            <span><button>14</button></span>
            <span><button>15</button></span>
          </div>
          
        </div>
        <div className='relative my-4'>
          <p className='absolute left-1 text-white'>D</p>
          <div className='absolute top-0 right-1 text-white'>D</div>
          <div className={styles.chair}>
            <span><button>1</button></span>
            <span><button>2</button></span>
            <span><button>3</button></span>
            <span><button>4</button></span>
            <span><button>5</button></span>
            <span><button>6</button></span>
            <span><button>7</button></span>
            <span><button>8</button></span>
            <span><button>8</button></span>
            <span><button>10</button></span>
            <span><button>11</button></span>
            <span><button>12</button></span>
            <span><button>13</button></span>
            <span><button>14</button></span>
            <span><button>15</button></span>
          </div>
          
        </div>
        <div className='relative my-4'>
          <p className='absolute left-1 text-white'>E</p>
          <div className='absolute top-0 right-1 text-white'>E</div>
          <div className={styles.chair}>
            <span><button>1</button></span>
            <span><button>2</button></span>
            <span><button>3</button></span>
            <span><button>4</button></span>
            <span><button>5</button></span>
            <span><button>6</button></span>
            <span><button>7</button></span>
            <span><button>8</button></span>
            <span><button>8</button></span>
            <span><button>10</button></span>
            <span><button>11</button></span>
            <span><button>12</button></span>
            <span><button>13</button></span>
            <span><button>14</button></span>
            <span><button>15</button></span>
          </div>
          
        </div>
        <div className='relative my-4'>
          <p className='absolute left-1 text-white'>F</p>
          <div className='absolute top-0 right-1 text-white'>F</div>
          <div className={styles.chair}>
            <span><button>1</button></span>
            <span><button>2</button></span>
            <span><button>3</button></span>
            <span><button>4</button></span>
            <span><button>5</button></span>
            <span><button>6</button></span>
            <span><button>7</button></span>
            <span><button>8</button></span>
            <span><button>8</button></span>
            <span><button>10</button></span>
            <span><button>11</button></span>
            <span><button>12</button></span>
            <span><button>13</button></span>
            <span><button>14</button></span>
            <span><button>15</button></span>
          </div>
          
        </div>
        <div className='relative my-4'>
          <p className='absolute left-1 text-white'>G</p>
          <div className='absolute top-0 right-1 text-white'>G</div>
          <div className={styles.chair}>
            <span><button>1</button></span>
            <span><button>2</button></span>
            <span><button>3</button></span>
            <span><button>4</button></span>
            <span><button>5</button></span>
            <span><button>6</button></span>
            <span><button>7</button></span>
            <span><button>8</button></span>
            <span><button>8</button></span>
            <span><button>10</button></span>
            <span><button>11</button></span>
            <span><button>12</button></span>
            <span><button>13</button></span>
            <span><button>14</button></span>
            <span><button>15</button></span>
          </div>
          
        </div>
        <div className='relative my-4'>
          <p className='absolute left-1 text-white'>H</p>
          <div className='absolute top-0 right-1 text-white'>H</div>
          <div className={styles.chair}>
            <span><button>1</button></span>
            <span><button>2</button></span>
            <span><button>3</button></span>
            <span><button>4</button></span>
            <span><button>5</button></span>
            <span><button>6</button></span>
            <span><button>7</button></span>
            <span><button>8</button></span>
            <span><button>8</button></span>
            <span><button>10</button></span>
            <span><button>11</button></span>
            <span><button>12</button></span>
            <span><button>13</button></span>
            <span><button>14</button></span>
            <span><button>15</button></span>
          </div>
          
        </div>
        <div className='relative my-4'>
          <p className='absolute left-1 text-white'>I</p>
          <div className='absolute top-0 right-1 text-white'>I</div>
          <div className={styles.chair}>
            <span><button>1</button></span>
            <span><button>2</button></span>
            <span><button>3</button></span>
            <span><button>4</button></span>
            <span><button>5</button></span>
            <span><button>6</button></span>
            <span><button>7</button></span>
            <span><button>8</button></span>
            <span><button>8</button></span>
            <span><button>10</button></span>
            <span><button>11</button></span>
            <span><button>12</button></span>
            <span><button>13</button></span>
            <span><button>14</button></span>
            <span><button>15</button></span>
          </div>
          
        </div>
        <div className='relative my-4'>
          <p className='absolute left-1 text-white'>J</p>
          <div className='absolute top-0 right-1 text-white'>J</div>
          <div className={styles.chair}>
            <span><button className='active'>1</button></span>
            <span><button>2</button></span>
            <span><button>3</button></span>
            <span><button>4</button></span>
            <span><button>5</button></span>
            <span><button>6</button></span>
            <span><button>7</button></span>
            <span><button>8</button></span>
            <span><button>8</button></span>
            <span><button>10</button></span>
            <span><button>11</button></span>
            <span><button>12</button></span>
            <span><button>13</button></span>
            <span><button>14</button></span>
            <span><button>15</button></span>
          </div>
          
        </div>
        <div className='relative my-4'>
          <p className='absolute left-1 text-white'>K</p>
          <div className='absolute top-0 right-1  text-white'>K</div>
          <div className={styles.chair_K}>
            <span><button>1</button></span>
            <span><button>2</button></span>
            <span><button>3</button></span>
            <span><button>4</button></span>
            <span><button>5</button></span>
            <span><button>6</button></span>
          </div>
          
        </div>
        {/* end chair */}
        <div className='my-10 flex justify-around mx-20'>
          <div className='flex'>
            <p className='w-5 h-5 bg-white'></p>
            <span className='text-white pl-2'> Ghế Thường</span>
          </div>
          <div className='flex'>
            <p className='w-5 h-5 bg-blue-800'></p>
            <span className='text-white pl-2'> Ghế VIP</span>
          </div>
          <div className='flex'>
            <p className='w-5 h-5 bg-pink-400'></p>
            <span className='text-white pl-2'> Ghế Đôi</span>
          </div>
          <div className='flex'>
            <p className='w-5 h-5 bg-green-800'></p>
            <span className='text-white pl-2'> Ghế Đã Chọn</span>
          </div>
          <div className='flex'>
            <p className='w-5 h-5 bg-red-600'></p>
            <span className='text-white pl-2'> Ghế Đã Bán</span>
          </div> 
        </div>
      </div>
      <div className='h-[598px] bg-[url(https://chieuphimquocgia.com.vn/Themes/RapChieuPhim/Content/content.v2/images/bg04.png)]'>
        <div className='text-center'>
          <Link to={`#`}>
            <button className='rounded-3xl mt-14 border border-white text-white w-40 h-12'>Chọn lại phim</button>
          </Link>
        </div>
        <div>
          <img className='mx-auto w-[200px] mt-2' src="https://chieuphimquocgia.com.vn/content/images/0016606_0.jpeg" alt="" />
        </div>
        <div className='text-white px-3 mt-5'>
          <p>Ghế đã chọn: D3,D5</p>
          <div className='border border-white px-3 my-2'></div>
          <p>Tổng: <span className='text-red-600 text-2xl pl-5'>200.000đ</span></p>
          <div className='text-center'>
           <button className='rounded-3xl my-5 bg-red-600 border border-white text-white w-36 h-12'>Thanh Toán</button>
          </div>
        </div>
      </div>
    </div>
        {/* end chair */}
            
      </div>
    </>
  )
}

export default BookChair