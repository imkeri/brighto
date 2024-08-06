import React from "react";
import AddNewModal from "@components/Modal/AddNewModal";
import { useWhiteList } from "@hooks/user/whiteList/useWhiteList";
import UserWhiteList from "@components/tables/UserWhiteList/Index";

const Index = () => {
    const { showModal, handleModal, whitelistData, fetchWhitelistData, deleteWhiteIPData } = useWhiteList();

    console.log('Whitelist Data Length:', whitelistData?.length);

    return (
        <>
            {showModal && (
                <AddNewModal
                    handleModal={() => handleModal(!showModal)}
                    fetchWhitelistData={fetchWhitelistData}
                />
            )}
            <div className="flex justify-between">
                <button
                    className="bg-[#f19357] text-white px-4 py-2 rounded hover:bg-brand-600"
                    onClick={() => handleModal(!showModal)}
                    disabled={whitelistData?.length >= 10}
                    style={{ backgroundColor: whitelistData?.length >= 10 ? 'gray' : '#f19357' }}>
                    Add new
                </button>
            </div>
            <section className="mt-2">
                <p className="text-red-500 mb-4">
                    Note: You can add a maximum of 10 IPs, {10 - whitelistData?.length} are left.
                </p>
                <UserWhiteList data={whitelistData} deletewhiteIp={deleteWhiteIPData} type="user" />
            </section>
        </>
    );
};

export default Index;


