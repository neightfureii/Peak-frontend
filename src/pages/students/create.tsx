import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import { CreateView } from "@/components/refine-ui/views/create-view"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useBack } from "@refinedev/core"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "@refinedev/react-hook-form"
import { studentSchema } from "@/lib/schema"
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import UploadWidget from "@/components/custom-components/upload-widget"
import { ArrowLeft } from "lucide-react"
import { ROLES } from "@/constants"

type UploadFile = {
  url: string;
  publicId: string;
};

const StudentsCreate = () => {
  const back = useBack();

  const form = useForm({
    resolver: zodResolver(studentSchema),
    refineCoreProps: {
      resource: 'students',
      action: 'create',
    },
  })

  const {
    refineCore: { onFinish },
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = form;

  const onSubmit = async (values: z.infer<typeof studentSchema>) => {
    try {
      console.log('Submitted Form Values');
      await onFinish(values);
    } catch (error) {
      console.error('Error creating student', error);
    }
  }

  const imagePublicId = watch('imageCldPubId');

  const setstudentImage = (
    file: UploadFile | null,
    field: {
      onChange: (value: string) => void;
    }
  ) => {
    if(file) {
      field.onChange(file.url);
      form.setValue('imageCldPubId', file.publicId, {
        shouldValidate: true,
        shouldDirty: true
      });
    } else {
      field.onChange('');
      form.setValue('imageCldPubId', '', {
        shouldValidate: true,
        shouldDirty: true
      });
    }
  }

  return (
    <CreateView className="page-view">
      <Breadcrumb />

      <h1 className="page-title">Create a student</h1>

      <div className="intro-row">
        <p>Provide the required information below to add a new student.</p>
        <Button onClick={back}>
          <ArrowLeft size={15} />
          Go Back
        </Button>
      </div>
      
      <Separator />

      <div className="my-4 flex items-center">
        <Card className="page-form-card">
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
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>student Image <span className="text-orange-600">*</span></FormLabel>
                      <FormControl>
                        <UploadWidget value={field.value ? { url: field.value, publicId: imagePublicId ?? '' } : null} onChange={(file) => setstudentImage(file, field)} />
                      </FormControl>
                      <FormMessage />
                      {errors.imageCldPubId && !errors.image && (<p className="text-destructive text-sm">{errors.imageCldPubId.message?.toString()}</p>)}
                    </FormItem>
                  )} 
                />
                
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name <span className="text-orange-600">*</span></FormLabel>
                      <FormControl>
                        <Input placeholder="Enter student name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} 
                />

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email <span className="text-orange-600">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="Enter student email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} 
                  />

                  <FormField
                    control={control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role <span className="text-orange-600">*</span></FormLabel>
                        <Select onValueChange={(value) => field.onChange(value)} value={field?.value?.toString()}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ROLES.map((option) => (
                              <SelectItem value={option.value} key={option.id}>
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
                <Button type="submit">Create Student</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </CreateView>
  )
}

export default StudentsCreate