"use client";

import Separator from "@/components/Common/Separator";

import MobileMenu from "@/components/Header/MobileMenu";

import Context from "@/context/Context";
import Store from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

import KITHeader from "@/components/Header/KITHeader";
import KITFooter from "@/components/Footer/KITFooter";
import MasterDataSidebar from "@/components/(Alumni)/component/KITMaster/MasterDataSidebar";
import AdminSkillsMain from "@/components/(Alumni)/component/main/AdminSkillsMain";
import AdminRoleMain from "@/components/(Alumni)/component/main/AdminRoleMain";
import AdminIndustryTypeMain from "@/components/(Alumni)/component/main/AdminIndustryTypeMain";
import AdminLocationsMain from "@/components/(Alumni)/component/main/AdminLocationsMain";
import AdminCountryMain from "@/components/(Alumni)/component/main/AdminCountryMain";



const Country = () => {
  return (
  <>
      <Provider store={Store}>
        <Context>
          <MobileMenu />
          <KITHeader headerSticky="rbt-sticky" headerType="" />

          <div className="rbt-page-banner-wrapper">
            <div className="rbt-banner-image" />
          </div>
          <div className="rbt-dashboard-area rbt-section-overlayping-top rbt-section-gapBottom">
            <div className="container-flyuid">
              <div className="row justify-content-center">
                <div className="col-11 col-xl-10 con-wid">
                  <div className="container-fuild">
                    <div className="row">
                      <div className="col-lg-12">
                        {/* <InstructorDashboardHeader /> */}

                        <div className="row g-5">
                          <div className="col-lg-3">
                            <MasterDataSidebar />
                          </div>

                          <div className="col-lg-9">
                            {/* <AdminMain /> */}
                            <AdminCountryMain/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />
          <KITFooter />
        </Context>
      </Provider>
    </>
  );
};

export default Country;
