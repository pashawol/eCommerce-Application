<template>
  <div class="sUserProfileView">
    <Dialog
      :showHeader="false"
      v-model:visible="modalVisible"
      modal
      class="flex flex-column px-2 sm:px-5 py-5 gap-4"
      style="
        width: 35rem;
        border-radius: 12px;
        background-image: radial-gradient(
          circle at left top,
          var(--primary-400),
          var(--primary-700)
        );
      "
    >
      <template #container="{ closeCallback }">
        <form @submit.prevent="submit()">
          <div class="d-flex flex-column sm:flex-row gap-2 mb-1">
            <div class="flex flex-column align-items-start gap-2 mb-1 w-100 flex-grow-1">
              <label for="username">Change Name</label>
              <InputText
                id="text"
                v-model="userStore.dataForm.name"
                aria-describedby="username-help"
                @input="userStore.validateName"
                style="width: 100%; flex-grow: 0"
              />
              <small style="max-width: 161px" class="p-error" id="username-help">{{
                userStore.errorsForm.name
              }}</small>
            </div>
            <div class="flex flex-column align-items-start gap-2 mb-1 w-100 flex-grow-1">
              <label for="surname">Change Surname</label>
              <InputText
                id="text"
                v-model="userStore.dataForm.lastName"
                aria-describedby="surname-help"
                @input="userStore.validateSurname"
                style="width: 100%; flex-grow: 0"
              />
              <small style="max-width: 161px" class="p-error" id="surname-help">{{
                userStore.errorsForm.lastName
              }}</small>
            </div>
            <div class="flex flex-column align-items-start gap-2 mb-1 w-100 flex-grow-1">
              <label for="middlename">Change Midllename</label>
              <InputText
                id="text"
                v-model="userStore.dataForm.midlleName"
                aria-describedby="middlename-help"
                @input="userStore.validateMiddleName"
                style="width: 100%; flex-grow: 0"
              />
              <small style="max-width: 161px" class="p-error" id="midlleName-help">{{
                userStore.errorsForm.midlleName
              }}</small>
            </div>
          </div>
          <div class="flex flex-column gap-2 mb-1">
            <label for="date">Date of Birth</label>
            <Calendar
              id="date"
              v-model="userStore.mainDateOfBirth"
              dateFormat="dd-mm-yy"
              :manualInput="false"
              @date-select="userStore.validateDOB"
              :maxDate="new Date()"
            />
            <small class="p-error" id="date-help">{{ userStore.errorsForm.dateOfBirth }}</small>
          </div>
          <div class="flex flex-column gap-2 mb-1">
            <label for="username">Change Email</label>
            <InputText
              id="email"
              v-model="userStore.dataForm.email"
              aria-describedby="email-help"
              @input="userStore.validateEmail"
            />
            <small class="p-error" id="email-help">{{ userStore.errorsForm.email }}</small>
          </div>
          <div class="flex align-items-center gap-3">
            <Button
              type="button"
              label="Cancel"
              @click="closeCallback"
              text
              class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
            ></Button>
            <Button
              type="submit"
              label="Save Changes"
              :disabled="!userStore.isFilledForm()"
              text
              class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
            ></Button>
          </div>
        </form>
      </template>
    </Dialog>
    <Dialog
      :showHeader="false"
      v-model:visible="modalAddressVisible"
      modal
      class="flex flex-column px-2 sm:px-5 py-5"
      style="
        width: 35rem;
        border-radius: 12px;
        background-image: radial-gradient(
          circle at left top,
          var(--primary-400),
          var(--primary-700)
        );
      "
    >
      <template #container="{ closeCallback }">
        <h3 class="mb-0">
          {{ addressStore.action === 'changeAddress' ? 'Change Address Info' : '' }}
        </h3>
        <form @submit.prevent="addressSumbit()">
          <div class="flex flex-column gap-2 mb-1">
            <label for="country">Country</label>
            <Dropdown
              id="country"
              v-model="addressStore.countriesDropdown"
              aria-describedby="country-help"
              :options="addressStore.countries"
              optionLabel="name"
              @change="addressStore.validatePostalCode"
            />
            <small class="p-error" id="country-help">{{
              addressStore.addressErrorsForm.country
            }}</small>
          </div>
          <div class="flex flex-column gap-2">
            <label for="postal-code">Postal Code</label>
            <InputText
              id="postal-code"
              v-model="addressStore.address.postalCode"
              aria-describedby="postal-code-help"
              @input="addressStore.validatePostalCode"
            />
            <small class="p-error" id="postal-code-help">{{
              addressStore.addressErrorsForm.postalCode
            }}</small>
          </div>

          <div class="flex flex-column gap-2">
            <label for="city">City</label>
            <InputText
              id="city"
              v-model="addressStore.address.city"
              aria-describedby="city-help"
              @input="addressStore.validateCity"
            />
            <small class="p-error" id="city-help">{{ addressStore.addressErrorsForm.city }}</small>
          </div>

          <div class="flex flex-column gap-2 mb-1">
            <label for="street">Street</label>
            <InputText
              id="street"
              v-model="addressStore.address.streetName"
              aria-describedby="street-help"
              @input="addressStore.validateStreet"
            />
            <small class="p-error" id="street-help">{{
              addressStore.addressErrorsForm.streetName
            }}</small>
          </div>
          <div class="flex align-items-center gap-3">
            <Button
              type="button"
              label="Cancel"
              @click="closeCallback"
              text
              class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
            ></Button>
            <Button
              type="submit"
              label="Save Changes"
              :disabled="!addressStore.isFilledAddressForm()"
              text
              class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
            ></Button>
          </div>
        </form>
      </template>
    </Dialog>
    <Dialog
      :showHeader="false"
      v-model:visible="modalRemoveAddressVisible"
      modal
      class="flex flex-column px-2 sm:px-5 py-5 gap-4"
      style="
        width: 35rem;
        border-radius: 12px;
        background-image: radial-gradient(
          circle at left top,
          var(--primary-400),
          var(--primary-700)
        );
      "
    >
      <template #container="{ closeCallback }">
        <h2 class="text-center">Are you sure to delete address?</h2>
        <div class="flex align-items-center gap-3">
          <Button
            type="button"
            label="Cancel"
            @click="closeCallback"
            text
            class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
          ></Button>
          <Button
            type="submit"
            label="Approve"
            @click="approveDeletting()"
            text
            class="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
          ></Button>
        </div>
      </template>
    </Dialog>
    <div class="container">
      <h1 class="sUserProfileView__title">
        Your profile info
        <Button @click="modalVisible = true">
          <Icon name="pencil" />
        </Button>
      </h1>
      <div class="sUserProfileView__row row">
        <div class="col">
          <div class="sUserProfileView__wrap">
            <span>Name, MiddleName, LastName</span>
            {{ userData.firstName }} {{ userData.middleName }}
            {{ userData.lastName }}
          </div>
          <div class="sUserProfileView__wrap">
            <span>Birthday</span>
            {{ userData.dateOfBirth }}
          </div>
          <div class="sUserProfileView__wrap">
            <span>Email</span>
            {{ userData.email }}
          </div>
        </div>

        <div class="col">
          <h3>Shipping address</h3>
          <div class="sUserProfileView__addresses row">
            <div
              class="sUserProfileView__address-wrap col"
              v-for="addressIDs of userData.shippingAddressIds"
              :key="addressIDs"
            >
              <Badge
                v-if="
                  userData.defaultShippingAddressId &&
                  addressIDs === userData.defaultShippingAddressId
                "
                value="Default"
              />
              <Button
                class="edit-address"
                @click="
                  (modalAddressVisible = true),
                    (addressStore.ids = addressIDs),
                    (addressStore.action = 'changeAddress')
                "
              >
                <Icon name="pencil" />
              </Button>
              <Button
                class="delete-address"
                @click="
                  (modalRemoveAddressVisible = true),
                    (addressStore.action = 'removeShippingAddressId'),
                    (addressStore.ids = addressIDs)
                "
              >
                <Icon name="trashCan" />
              </Button>
              <div class="sUserProfileView__wrap">
                <span>Country</span>
                {{ findAddressData(addressIDs)?.country }}
              </div>
              <div class="sUserProfileView__wrap">
                <span>City</span>
                {{ findAddressData(addressIDs)?.city }}
              </div>
              <div class="sUserProfileView__wrap">
                <span>Street name</span>
                {{ findAddressData(addressIDs)?.streetName }}
              </div>
              <div class="sUserProfileView__wrap">
                <span>Postal code</span>
                {{ findAddressData(addressIDs)?.postalCode }}
              </div>
            </div>
            <div
              class="sUserProfileView__address-wrap add-address col"
              @click="
                (modalAddressVisible = true),
                  (addressStore.action = 'addAddress'),
                  (addressType = 'addShippingAddressId')
              "
            >
              <Icon name="plus" />
            </div>
          </div>
        </div>
        <div class="col">
          <h3>Billing address</h3>
          <div class="sUserProfileView__addresses row">
            <div
              class="sUserProfileView__address-wrap col"
              v-for="addressIDs of userData.billingAddressIds"
              :key="addressIDs"
            >
              <Badge
                v-if="
                  userData.defaultBillingAddressId &&
                  addressIDs === userData.defaultBillingAddressId
                "
                value="Default"
              />
              <Button
                class="edit-address"
                @click="
                  (modalAddressVisible = true),
                    (addressStore.ids = addressIDs),
                    (addressStore.action = 'changeAddress')
                "
              >
                <Icon name="pencil" />
              </Button>
              <Button
                class="delete-address"
                @click="
                  (modalRemoveAddressVisible = true),
                    (addressStore.action = 'removeBillingAddressId'),
                    (addressStore.ids = addressIDs)
                "
              >
                <Icon name="trashCan" />
              </Button>
              <div class="sUserProfileView__wrap">
                <span>Country</span>
                {{ findAddressData(addressIDs)?.country }}
              </div>
              <div class="sUserProfileView__wrap">
                <span>City</span>
                {{ findAddressData(addressIDs)?.city }}
              </div>
              <div class="sUserProfileView__wrap">
                <span>Street name</span>
                {{ findAddressData(addressIDs)?.streetName }}
              </div>
              <div class="sUserProfileView__wrap">
                <span>Postal code</span>
                {{ findAddressData(addressIDs)?.postalCode }}
              </div>
            </div>
            <div
              class="sUserProfileView__address-wrap add-address col"
              @click="
                (modalAddressVisible = true),
                  (addressStore.action = 'addAddress'),
                  (addressType = 'addBillingAddressId')
              "
            >
              <Icon name="plus" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import url('../scss/sUserProfileView.scss');
</style>

<script setup lang="ts">
  import type { Address } from '@commercetools/platform-sdk'
  import { useGlobalStore } from '@/store/GlobalStore'
  import { useUserStore } from '../store/UserStore'
  import { useAddressStore } from '../store/AddressStore'
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'
  import Calendar from 'primevue/calendar'
  import Badge from 'primevue/badge'
  import Dialog from 'primevue/dialog'
  import Dropdown from 'primevue/dropdown'
  import { useToast } from 'primevue/usetoast'

  const globalStore = useGlobalStore()
  const userStore = useUserStore()
  const addressStore = useAddressStore()

  const { userData } = storeToRefs(globalStore)
  const toast = useToast()
  const modalVisible = ref<boolean>(false)
  const modalAddressVisible = ref<boolean>(false)
  const modalRemoveAddressVisible = ref<boolean>(false)
  const addressType = ref<string>('')

  function findAddressData(id: string): Address | undefined {
    return userData.value.addresses.find((address) => address.id === id)
  }

  const submit = () => {
    userStore.changePersonalInfo().then(() => {
      modalVisible.value = false
      toast.add({
        ...userStore.toast,
        life: 3000
      })
    })
  }

  const addressSumbit = () => {
    addressStore.addressAction().then(() => {
      modalAddressVisible.value = false
      toast.add({
        ...addressStore.toast,
        life: 3000
      })
      if (addressStore.action === 'addAddress') {
        addressStore.addAddressToPosition(addressType.value).then(() => {
          toast.add({
            ...addressStore.toast,
            life: 3000
          })
        })
      }
    })
  }

  const approveDeletting = () => {
    addressStore.addressAction().then(() => {
      modalRemoveAddressVisible.value = false
      toast.add({
        ...addressStore.toast,
        life: 3000
      })
    })
  }
</script>
