import React from 'react'
import { Avatar, Button } from "@mui/material";
import Link from "next/link";
import classes from './Footer.module.scss'
const Footer = () => {  
  return ( 
    <div className={[classes.container, "ThinScrollbar_2"].join(" ")}>
    <div className={classes.lastPart}>
      <div className={classes.gridDivision}>
        <div className={classes.footerGrid1}>
          <Avatar
            className={classes.logoLastPart}
            variant={"rounded"}
            src="/welcomePage/breakFree2.png"
          />
          <div className={classes.soulSaid}>SOUL SAYS BREAK FREE</div>
          <Button className={classes.btnBookService}>Book a service</Button>
        </div>
        <div className={classes.footerGrid2}>
          <div className={classes.headPopularService}>
            POPULAR SERVICES1
          </div>
          <div className={classes.innerGrid}>
            <ul className={classes.ulPopularServices}>
              <li>
                <a className={classes.lineText} href="">
                  Art
                </a>
              </li>
              <li>
                <a className={classes.lineText} href="">
                  Dance
                </a>
              </li>
              <li>
                <a className={classes.lineText} href="">
                  Music
                </a>
              </li>
              <li>
                <a className={classes.lineText} href="">
                  Fashion
                </a>
              </li>
              <li>
                <a className={classes.lineText} href="">
                  Actor
                </a>
              </li>
            </ul>

            <ul className={classes.ulPopularServices}>
              <li>
                <a className={classes.lineText} href="">
                  Photography
                </a>
              </li>
              <li>
                <a className={classes.lineText} href="">
                  Comedy
                </a>
              </li>
              <li>
                <a className={classes.lineText} href="">
                  Layer
                </a>
              </li>
              <li>
                <a className={classes.lineText} href="">
                  Rap
                </a>
              </li>
              <li>
                <a className={classes.lineText} href="">
                  Blogger
                </a>
              </li>
            </ul>

            <ul className={classes.ulPopularServices}>
              <li>
                <a className={classes.lineText} href="">
                  Designer
                </a>
              </li>
              <li>
                <a className={classes.lineText} href="">
                  CA
                </a>
              </li>
              <li>
                <a className={classes.lineText} href="">
                  DJ
                </a>
              </li>
              <li>
                <a className={classes.lineText} href="">
                  Writer
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.footerGrid3}>
          <div className={classes.headLegals}>LEGAL</div>
          <ul className={classes.ulLegal1}>
            <li>
              <Link href="/termsandconditions">
                <a className={classes.lineText}>Terms and conditions</a>
              </Link>
            </li>
            <li>
              <Link href="/privacypolicy">
                <a className={classes.lineText}>Privacy Policy</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className={[classes.footerGrid3, classes.HdeDestop].join(" ")}>
          <div className={classes.headLegals}>Links</div>
          <ul className={classes.ulLegal1}>
            <li>
              <Link href="/aboutus">
                <a className={classes.lineText}>About Us</a>
              </Link>
            </li>
            <li>
              <Link href="/resources">
                <a className={classes.lineText}>Resources</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div className={classes.copyrightSection}>
        <div className={classes.copyRights}>
          © Break Free 2021. All rights reserved
        </div>
        <div className={classes.iconEnd}>
          <Button className={classes.btnLast}>
            <Link href="https://twitter.com/ss_breakfree">
              <a target="_blank">
                <img className={classes.imgLast} src="" alt="" />
              </a>
            </Link>
          </Button>
          <Button className={classes.btnLast}>
            <Link href="https://www.instagram.com/ssbreakfree/">
              <a target="_blank">
                <img
                  className={classes.imgLast}
                  src="/welcomePage/instagram.svg"
                  alt=""
                />
              </a>
            </Link>
          </Button>
          <Button className={classes.btnLast}>
            <Link href="https://www.linkedin.com/company/breakfreeofficial">
              <a target="_blank">
                <img
                  className={classes.imgLast}
                  src="/welcomePage/linkedin.svg"
                  alt=""
                />
              </a>
            </Link>
          </Button>
          <Button className={classes.btnLast}>
            <Link href="https://www.facebook.com/ssbreakfree/?tsid=0.7922777780303092&source=result">
              <a target="_blank">
                <img
                  className={classes.imgLast}
                  src="/welcomePage/facebook.svg"
                  alt=""
                />
              </a>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Footer