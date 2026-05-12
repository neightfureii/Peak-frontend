import { useBack } from "@refinedev/core";
import { ArrowLeft, Code, Construction } from "lucide-react";

interface UnderDevelopmentProps {
    title?: string;
    description?: string;
}

const UnderDevelopment = ({
    title = "This page is under development",
    description = "We're working on something here. Check back soon or head back to a page that's ready.",
}: UnderDevelopmentProps) => {
    const back = useBack();

    return (
        <div className="flex flex-col items-center justify-center min-h-105 px-8 py-16 text-center">

            <div className="relative mb-8">
                <div className="w-22 h-22 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center p-5">
                    <Code size={40} className="text-gray-400" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center">
                    <Construction size={14} className="text-amber-700" />
                </div>
            </div>

            <span className="text-xs font-medium tracking-widest uppercase text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200 mb-3">
                In progress
            </span>

            <h1 className="text-xl font-medium text-gray-900 mt-2 mb-2">{title}</h1>
            <p className="text-sm text-gray-500 max-w-sm leading-relaxed mb-8">{description}</p>

            <div className="flex gap-3 flex-wrap justify-center">
                <button
                    type="button"
                    onClick={back}
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft size={15} />
                    Go back
                </button>
            </div>
        </div>
    );
};

export default UnderDevelopment;