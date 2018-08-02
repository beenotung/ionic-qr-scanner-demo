import {ModalController, ModalOptions, ToastController, ToastOptions} from "ionic-angular";

export function showToast(toastCtrl: ToastController, opts?: ToastOptions) {
  opts = opts || {};
  if (opts.dismissOnPageChange === undefined) {
    opts.dismissOnPageChange = true;
  }
  if (opts.duration === undefined) {
    opts.duration = 2000;
  }
  let toast = toastCtrl.create(opts);
  return new Promise((resolve, reject) => {
    toast.onDidDismiss((data, role) => {
      resolve(data)
    });
    toast.present();
  });
}

export async function showModal<A>(modalCtrl: ModalController, component, data?, opts?: ModalOptions): Promise<A> {
  let modal = modalCtrl.create(component, data, opts);
  return new Promise<A>((resolve, reject) => {
    modal.onDidDismiss(text => resolve(text));
    modal.present()
  })
}
