import React from 'react'
import AddNewPlan from '@components/Modal/AddNewPlan'
import { useMyPlan } from '@hooks/admin/MyPlan/useMyPlan'
import MyPlan from "@components/tables/MyPlan/Index"

const Index = () => {
    const { showModal, handleModal ,allPlan,getPlanList} = useMyPlan()

    return (
        <div>
            {showModal && <AddNewPlan handleModal={() => handleModal(!showModal)} getPlanList={getPlanList}/>}
            <div className="flex justify-between">
                <button
                    className="bg-[#f19357] text-white px-4 py-2 rounded mb-4"
                    onClick={() => handleModal(!showModal)}
                >
                    Add new
                </button>
            </div>
            <section className="mt-2">
               <MyPlan data = {allPlan}  handleModal={() => handleModal(!showModal)} getPlanList={getPlanList} />
            </section>
        </div>
    )
}

export default Index
