import React from 'react'
import { Element } from 'react-scroll'
import './nowplaying.css'
import m1 from '../../images/m1.jpg'
import m2 from '../../images/m2.jpg'
import m3 from '../../images/m3.jpg'
import m4 from '../../images/m4.jpg'
import m5 from '../../images/m5.webp'
import m6 from '../../images/m6.jpeg'
import m7 from '../../images/m7.jpg'
import m8 from '../../images/m8.jpg'
const nowplaying = () => {
  return (
    <Element className='nowplaying' id='now_playing'>
        <h2>Now Streaming</h2>
        <div className='nowplaying_container1'>
        <div className='movie'>
                <img src={m1} alt='movie1'/>
                <div className='title'>
                    <h6>Midnight</h6>
                    <div className='subtitle'>
                    <p>⭐⭐⭐⭐</p>
                    <a href='https://en.wikipedia.org/wiki/Midnight_(2021_film)'>
                    <button>🗒⭑.ᐟ</button>
                    </a>
                    </div>
                </div>
            </div>
            <div className='movie'>
                <img src={m2} alt='movie2'/>
                <div className='title'>
                    <h6>Train to Busan</h6>
                    <div className='subtitle'>
                    <p>⭐⭐⭐</p>
                    <a href='https://en.wikipedia.org/wiki/Train_to_Busan'>
                    <button>🗒⭑.ᐟ</button>
                    </a>
                    </div>
                </div>
            </div>
            <div className='movie'>
                <img src={m3} alt='movie3'/>
                <div className='title'>
                    <h6>Unlocked</h6>
                   <div className='subtitle'>
                    <p>⭐⭐⭐</p>
                    <a href='https://en.wikipedia.org/wiki/Unlocked_(2023_film)'>
                    <button>🗒⭑.ᐟ</button>
                    </a>
                    </div>
                </div>
            </div>
            <div className='movie'>
                <img src={m4} alt='movie4'/>
                <div className='title'>
                    <h6>Call</h6>
                    <div className='subtitle'>
                    <p>⭐⭐⭐⭐</p>
                    <a href='https://en.wikipedia.org/wiki/The_Call_(2020_South_Korean_film)'>
                    <button>🗒⭑.ᐟ</button>
                    </a>
                    </div>
                </div>
            </div>
        </div>
        <div className='nowplaying_container2'>
            <div className='movie'>
                <img src={m5} alt='movie5'/>
                <div className='title'>
                    <h6>Parasite</h6>
                    <div className='subtitle'>
                    <p>⭐⭐⭐</p>
                    <a href='https://en.wikipedia.org/wiki/Parasite_(2019_film)'>
                    <button>🗒⭑.ᐟ</button>
                    </a>
                    </div>
                </div>
            </div>
            <div className='movie'>
                <img src={m6} alt='movie6'/>
                <div className='title'>
                    <h6>Missing you</h6>
                    <div className='subtitle'>
                    <p>⭐⭐⭐</p>
                    <a href='https://en.wikipedia.org/wiki/Missing_You_(2016_film)'>
                    <button>🗒⭑.ᐟ</button>
                    </a>
                    </div>
                </div>
            </div>
            <div className='movie'>
                <img src={m7} alt=''/>
                <div className='title'>
                    <h6>Forgotten</h6>
                    <div className='subtitle'>
                    <p>⭐⭐⭐⭐</p>
                    <a href='https://en.wikipedia.org/wiki/Forgotten_(2017_film)'>
                    <button>🗒⭑.ᐟ</button>
                    </a>
                    </div>
                </div>
            </div>
            <div className='movie'>
                <img src={m8} alt=''/>
                <div className='title'>
                    <h6>Exhuma</h6>
                    <div className='subtitle'>
                    <p>⭐⭐⭐⭐⭐</p>
                    <a href='https://en.wikipedia.org/wiki/Exhuma'>
                    <button>🗒⭑.ᐟ</button>
                    </a>
                    </div>
                </div>
            </div>
        </div>
    </Element>
  )
}

export default nowplaying