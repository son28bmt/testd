import { Fragment } from "react";

const SkeletonAdminItem = ({ count = 4 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => {
                return (
                    <Fragment key={i}>
                        <tr className="animate-pulse [&>td>div]:mx-1 [&>td>div]:my-1 [&>td>div]:bg-gray-200 [&>td>div]:rounded-md [&>td>div]:h-10">
                            <td className="">
                                <div></div>
                            </td>
                            <td className="">
                                <div></div>
                            </td>
                            <td className="">
                                <div></div>
                            </td>
                            <td className="">
                                <div></div>
                            </td>
                            <td className="">
                                <div></div>
                            </td>
                        </tr>
                    </Fragment>
                );
            })}
        </>
    );
};

export default SkeletonAdminItem;