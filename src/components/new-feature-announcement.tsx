const NewFeatureAnnouncement = () => {
    return (
        <>
            <div className="h-8"></div>
            <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
                🌟 <div data-orientation="vertical" role="none" className="shrink-0 bg-border w-[1px] mx-2 h-4"></div>
                <span className="">
                    <b className="mr-1">New Feature Now On:</b>{" "}
                    <span className="dark:text-yellow-400">API Access to Our Legal Document Services.</span>
                </span>
            </div>
            <div className="h-8"></div>
        </>
    );
};

export default NewFeatureAnnouncement;
