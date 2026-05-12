import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import { CreateView } from "@/components/refine-ui/views/create-view"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useBack } from "@refinedev/core"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { sportSchema } from "@/lib/schema"
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SPORTS_CATEGORIES_OPTIONS } from "@/constants"
import { Textarea } from "@/components/ui/textarea"
import UploadWidget from "@/components/custom-components/upload-widget"

const SportsCreate = () => {
  const back = useBack();

  const form = useForm({
    resolver: zodResolver(sportSchema),
    refineCoreProps: {
      resource: 'sports',
      action: 'create',
    },
  })

  const { handleSubmit, formState: { isSubmitting, errors }, control } = form;

  const onSubmit = (values: z.infer<typeof sportSchema>) => {
    try {
      console.log('Form Values:', values);
    } catch (error) {
      console.error('Error creating sport:', error);
    }
  }

  const bannerPublicId = form.watch('bannerCldPubId');

  const setBannerImage = (file, field) => {
    if(file) {
      field.onChange(file.url);
      form.setValue('bannerCldPubId', file.publicId, { shouldValidate: true, shouldDirty: true });
    } else {
      field.onChange('');
      form.setValue('bannerCldPubId', '', { shouldValidate: true, shouldDirty: true });
    }
  }

  return (
    <CreateView className="class-view">
      <Breadcrumb />

      <h1 className="page-title">Create a Sport</h1>

      <div className="intro-row">
        <p>Provide the required information below to add a new sport.</p>
        <Button onClick={back}>Go Back</Button>
      </div>
      
      <Separator />

      <div className="my-4 flex items-center">
        <Card className="class-form-card">
          <CardHeader className="relative z-10">
            <CardTitle className="text-2xl pb-0 font-bold">Fill out the form</CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className="mt-7">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={control}
                  name="bannerUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Banner Image <span className="text-orange-600">*</span></FormLabel>
                      <FormControl>
                        <UploadWidget value={field.value ? { url: field.value, publicId: bannerPublicId ?? '' } : null} onChange={(file, field) => setBannerImage(file, field)} />
                      </FormControl>
                      <FormMessage />
                      {errors.bannerCldPubId && !errors.bannerUrl && (<p className="text-destructive text-sm">{errors.bannerCldPubId.message?.toString()}</p>)}
                    </FormItem>
                  )} 
                />
                
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sport Name <span className="text-orange-600">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter sport name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} 
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category <span className="text-orange-600">*</span></FormLabel>
                        <Select onValueChange={(value) => field.onChange(Number(value))} value={field?.value?.toString()}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SPORTS_CATEGORIES_OPTIONS.map((option) => (
                              <SelectItem key={option.id} value={option.id.toString()}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />
                </div>

                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter a brief description about the sport" className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} 
                />
                <Button type="submit">Create Sport</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </CreateView>
  )
}

export default SportsCreate