import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Card } from "@/components/ui/card";
import { SportDetails } from "@/types";
import { useShow } from "@refinedev/core"
import { AdvancedImage } from "@cloudinary/react";
import { bannerPhoto } from "@/lib/cloudinary";
import { Badge } from "@/components/ui/badge";

const SportsShow = () => {
    const { query } = useShow<SportDetails>({ resource: 'sports' });

    const sportDetails = query.data?.data;
    const { isLoading, isError } = query;

    if(isLoading || isError || !sportDetails) {
        return (
            <ShowView className="page-view page-show">
                <ShowViewHeader resource="sports" title="Sport Details" isShowPage={true} />

                <p className="state-message">
                    {isLoading ? 'Loading sport details...'
                        : isError ? 'Failed to load sport details...'
                            : 'Sport details not found.'}
                </p>
            </ShowView>
        )
    }

    // const placeholderUrl = 'https://placeholde.co/600x400';

    const { name, code, description, bannerUrl, bannerCldPubId, category } = sportDetails;
  return (
    <ShowView className="page-view page-show">
        <ShowViewHeader resource="sports" title="Sport Details" isShowPage={true} />

        <div className="banner">
            {bannerUrl && bannerCldPubId ? (
                <AdvancedImage alt="Sport Banner" cldImg={bannerPhoto(bannerCldPubId, name)} />
            ) : <div className="placeholder" />}
        </div>

        <Card className="details-card">
            <div className="details-header">
                <div>
                    <div className="flex flex-row gap-4">
                        <h1>{name}</h1>
                        <Badge>{code}</Badge>
                    </div>
                    <p>{description}</p>
                </div>

                <div>
                    <p>Category</p>

                    <div>
                        <p>{category?.name}</p>
                        <p>{category?.description}</p>
                    </div>
                </div>
            </div>
        </Card>
    </ShowView>
  )
}

export default SportsShow