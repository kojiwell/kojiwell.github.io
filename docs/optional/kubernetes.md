---
id: kubernetes
title: Kubernetes - extended Bourne shell
sidebar_label: Kubernetes
---

import TOCInline from '@theme/TOCInline';

<TOCInline toc={toc} />

## Install Kubernetes on Ubuntu 22.04 machines or VMs in April, 2024

This is a bit updated, brief note based on [How to Install Kubernetes Cluster on Ubuntu 22.04 (Step-by-Step Guide)](https://hbayraktar.medium.com/how-to-install-kubernetes-cluster-on-ubuntu-22-04-step-by-step-guide-7dbf7e8f5f99). You should read it for much better, well-written explanation.

### Update and upgrade Ubuntu [ALL]

```
sudo apt update
sudo apt upgrade
```

### Disable swap [ALL]

```
sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
```

### Add kernel parameters [ALL]

```
sudo tee /etc/modules-load.d/containerd.conf <<EOF
overlay
br_netfilter
EOF
```

```
sudo modprobe overlay
sudo modprobe br_netfilter
```

```
sudo tee /etc/sysctl.d/kubernetes.conf <<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF
```

```
sudo sysctl --system
```

### Install Containerd runtime [ALL]

```
sudo apt install -y curl gnupg2 software-properties-common apt-transport-https ca-certificates
```

```
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmour -o /etc/apt/trusted.gpg.d/docker.gpg
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

sudo apt update
sudo apt install -y containerd.io
```

```
containerd config default | sudo tee /etc/containerd/config.toml >/dev/null 2>&1
sudo sed -i 's/SystemdCgroup \= false/SystemdCgroup \= true/g' /etc/containerd/config.toml
```

```
sudo systemctl restart containerd
sudo systemctl enable containerd
```

### Add apt repository for Kubernetes [ALL]

```
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl gpg
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
```

### Install Kubectl, Kubeadm, and Kubelet [ALL]

```
sudo apt update
sudo apt install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

### Initialize the cluster with Kubeadm [MASTER]

```
sudo kubeadm init
```

To start using your cluster, you need to run the following as a regular user:

```
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

Alternatively, if you are the root user, you can run:

```
export KUBECONFIG=/etc/kubernetes/admin.conf
```

You should now deploy a pod network to the cluster. Run `kubectl apply -f [podnetwork].yaml` with one of the options listed at [Installing Addons](https://kubernetes.io/docs/concepts/cluster-administration/addons/).

### Install a network plugin "Calico" [MASTER]

```
kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.27.3/manifests/calico.yaml
```

### Add worker nodes [WORKER]

```
kubeadm join <ip address>:6443 --token xxxxxx.xxxxxxxxxxxxxxxx \
    --discovery-token-ca-cert-hash sha256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Verify the cluster nodes [MASTER]

```
kubectl get pods -A
kubectl get nodes
```

### Deploy test application [MASTER]

```
# 1. Create an NGINX pod
kubectl run nginx --image nginx

# 2. Check status
kubectl get pods --output=wide

# 3. Get a shell in the container
kubectl exec --stdin --tty nginx -- bash

# 4. Delete the container
kubectl delete pod nginx
```