import React from "react";
import AddNewModalAdmin from "@components/Modal/AddNewModalAdmin";
import { useWhiteList } from "@hooks/admin/whiteList/useWhiteList";
import OffCanvas from "@components/Offcanvas/Index";
import WhiteList from '@components/tables/WhiteList/Index';


const Index = () => {
    const { showModal, handleModal, handleOffCanvas, showOffCanvas, whitelistData, fetchWhitelistData } = useWhiteList();

    return (
        <>
            {showModal && <AddNewModalAdmin handleModal={() => handleModal(!showModal)} fetchWhitelistData={fetchWhitelistData} />}
            <OffCanvas handleOffCanvas={() => handleOffCanvas(!showOffCanvas)} open={showOffCanvas} fetchlistData={fetchWhitelistData} />
            <div className="flex justify-between">
                <button
                    className="bg-[#f19357] text-white px-4 py-2 rounded hover:bg-brand-600"
                    onClick={() => handleModal(!showModal)}
                >
                    Add new
                </button>
                <button className="bg-[#f19357] text-white px-4 py-2 rounded hover:bg-brand-600" onClick={() => handleOffCanvas(!showOffCanvas)}>
                    Filter
                </button>
            </div>
            <section className="mt-2">
               <WhiteList data = {whitelistData}/>
            </section>
        </>
    );
};

export default Index;
