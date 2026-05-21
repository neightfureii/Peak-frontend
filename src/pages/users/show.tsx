import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Card } from "@/components/ui/card";
import { UserDetails } from "@/types";
import { useShow } from "@refinedev/core"
import { AdvancedImage } from "@cloudinary/react";
import { userPhoto } from "@/lib/cloudinary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const UsersShow = () => {
    const { query } = useShow<UserDetails>({ resource: 'users' });

    const userDetails = query.data?.data;
    const { isLoading, isError } = query;

    if(isLoading || isError || !userDetails) {
        return (
            <ShowView className="page-view page-show">
                <ShowViewHeader resource="users" title="User Details" />

                <p className="state-message">
                    {isLoading ? 'Loading user details...'
                        : isError ? 'Failed to load user details...'
                            : 'User details not found.'}
                </p>
            </ShowView>
        )
    }

    const placeholderUrl = '/images/user_placeholder_image.png';

    const { name, email, role, image, imageCldPubId } = userDetails;
  return (
    <ShowView className="page-view page-show">
        <ShowViewHeader resource="users" title="User Details" isShowPage={true} />
        <Card className="details-card flex flex-row">
            <div className="profile-picture">
                {image && imageCldPubId ? (
                    <AdvancedImage alt="User Image" cldImg={userPhoto(imageCldPubId)} />
                ) : <img src={placeholderUrl} alt="Placeholder" className="object-cover w-full h-full" />}
            </div>
            <div className="details-header">
                <div>
                    <h1>{name}</h1>
                    <div className="flex flex-row gap-4">
                        <Badge>{role}</Badge>
                        <p>{email}</p>
                    </div>
                </div>
            </div>
        </Card>
        <Card className="details-card flex flex-row justify-center">
            <Button variant="default">
                Edit User
            </Button>
            <Button variant="destructive">
                Deactivate User
            </Button>
        </Card>
    </ShowView>
  )
}

export default UsersShow